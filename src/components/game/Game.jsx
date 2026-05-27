import { useState } from 'react'
import styles from './Game.module.css'
import Board from '../board/Board'
import Score from '../hud/Score'
import HudPanel from '../hud/HudPanel'
import StartScreen from '../screens/StartScreen'
import PauseScreen from '../screens/PauseScreen'
import GameOverScreen from '../screens/GameOverScreen'
import {
  INITIAL_SNAKE,
  INITIAL_FOOD,
  BOARD_SIZE,
  INITIAL_SPEED,
} from '../../constants/gameConfig'
import { DIRECTIONS } from '../../constants/directions'
import { GAME_STATUS } from '../../constants/gameStatus'

function Game() {
  const [snake, setSnake]               = useState(INITIAL_SNAKE)
  const [food, setFood]                 = useState(INITIAL_FOOD)
  const [direction, setDirection]       = useState(DIRECTIONS.RIGHT)
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT)
  const [score, setScore]               = useState(0)
  const [highScore, setHighScore]       = useState(0)
  const [level, setLevel]               = useState(1)
  const [speed, setSpeed]               = useState(INITIAL_SPEED)
  const [gameStatus, setGameStatus]     = useState(GAME_STATUS.START)

  /* Shared reset — avoids repeating the same setters */
  const resetGameState = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(DIRECTIONS.RIGHT)
    setNextDirection(DIRECTIONS.RIGHT)
    setScore(0)
    setLevel(1)
    setSpeed(INITIAL_SPEED)
  }

  const handleStartGame = () => {
    setGameStatus(GAME_STATUS.RUNNING)
  }

  const handlePauseGame = () => {
    setGameStatus((prev) =>
      prev === GAME_STATUS.RUNNING ? GAME_STATUS.PAUSED : GAME_STATUS.RUNNING
    )
  }

  const handleRestartGame = () => {
    resetGameState()
    setGameStatus(GAME_STATUS.RUNNING)
  }

  const handleMainMenu = () => {
    resetGameState()
    setGameStatus(GAME_STATUS.START)
  }

  /* Status color class applied on top of statusText base */
  const statusColorClass = {
    [GAME_STATUS.START]:     styles.statusStart,
    [GAME_STATUS.RUNNING]:   styles.statusRunning,
    [GAME_STATUS.PAUSED]:    styles.statusPaused,
    [GAME_STATUS.GAME_OVER]: styles.statusGameOver,
  }[gameStatus] ?? styles.statusStart

  const pad = (n, width = 6) => String(n).padStart(width, '0')

  return (
    <div className={styles.page}>
      <div className={styles.frame}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.headerEyebrow}>GRID SYSTEM</div>
          <h1 className={styles.title}>TRON SNAKE</h1>
          <p className={styles.subtitle}>GRID INITIALIZED</p>
        </header>

        {/* ── Arena: left | center | right ── */}
        <div className={styles.arenaLayout}>

          {/* Left panel */}
          <aside className={styles.leftPanel}>
            <Score score={score} highScore={highScore} />

            <HudPanel title="CONTROLS">
              <div className={styles.controlRow}>
                <span className={styles.controlKey}>ARROWS / WASD</span>
                <span className={styles.controlAction}>MOVE</span>
              </div>
              <div className={styles.controlRow}>
                <span className={styles.controlKey}>SPACE</span>
                <span className={styles.controlAction}>PAUSE</span>
              </div>
              <div className={styles.controlRow}>
                <span className={styles.controlKey}>R</span>
                <span className={styles.controlAction}>RESTART</span>
              </div>
            </HudPanel>

            <HudPanel title="PLAYER DATA">
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>CURRENT SCORE</span>
                <span className={styles.dataValue}>{pad(score)}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>HIGH SCORE</span>
                <span className={styles.dataValue}>{pad(highScore)}</span>
              </div>
            </HudPanel>
          </aside>

          {/* Center stage */}
          <section className={styles.centerStage}>
            <div className={styles.boardFrame}>
              <Board snake={snake} food={food} boardSize={BOARD_SIZE} />

              {gameStatus === GAME_STATUS.START && (
                <StartScreen onStart={handleStartGame} />
              )}
              {gameStatus === GAME_STATUS.PAUSED && (
                <PauseScreen
                  onResume={handlePauseGame}
                  onRestart={handleRestartGame}
                />
              )}
              {gameStatus === GAME_STATUS.GAME_OVER && (
                <GameOverScreen
                  score={score}
                  highScore={highScore}
                  onRestart={handleRestartGame}
                  onMainMenu={handleMainMenu}
                />
              )}
            </div>
            <p className={styles.arenaLabel}>ARENA CORE</p>
          </section>

          {/* Right panel */}
          <aside className={styles.rightPanel}>
            <HudPanel title="SYSTEM STATUS">
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>STATUS</span>
                <span className={`${styles.statusText} ${statusColorClass}`}>
                  {gameStatus}
                </span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>GRID</span>
                <span className={styles.dataValue}>ONLINE</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>PLAYER</span>
                <span className={styles.dataValue}>GUEST_001</span>
              </div>
            </HudPanel>

            <HudPanel title="GRID DATA">
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>LEVEL</span>
                <span className={styles.dataValue}>{pad(level, 2)}</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>SPEED</span>
                <span className={styles.dataValue}>{speed} MS</span>
              </div>
              <div className={styles.dataRow}>
                <span className={styles.dataLabel}>BOARD</span>
                <span className={styles.dataValue}>20 × 20</span>
              </div>
            </HudPanel>
          </aside>
        </div>

        {/* ── System feed ── */}
        <footer className={styles.systemFeed}>
          <span className={styles.feedItem}>▸ GRID ONLINE</span>
          <span className={styles.feedSep}>|</span>
          <span className={styles.feedItem}>▸ ENERGY CORE DETECTED</span>
          <span className={styles.feedSep}>|</span>
          <span className={styles.feedItem}>▸ STATUS: {gameStatus}</span>
          <span className={styles.feedSep}>|</span>
          <span className={styles.feedItem}>▸ PLAYER READY</span>
        </footer>

      </div>
    </div>
  )
}

export default Game
