import { useState, useCallback, useEffect } from 'react'
import styles from './Game.module.css'
import hudStyles from '../hud/Hud.module.css'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'
import { useGameLoop } from '../../hooks/useGameLoop'
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
  POINTS_PER_FOOD,
} from '../../constants/gameConfig'
import { DIRECTIONS } from '../../constants/directions'
import { GAME_STATUS } from '../../constants/gameStatus'
import { moveSnake } from '../../systems/movementSystem'
import {
  checkWallCollision,
  checkSelfCollision,
  checkFoodCollision,
} from '../../systems/collisionSystem'
import { generateFoodPosition } from '../../systems/foodSystem'

const HIGH_SCORE_STORAGE_KEY = 'tronSnakeHighScore'

function getDifficultyByScore(score) {
  if (score >= 200) return { level: 5, speed: 90 }
  if (score >= 150) return { level: 4, speed: 110 }
  if (score >= 100) return { level: 3, speed: 130 }
  if (score >= 50)  return { level: 2, speed: 150 }
  return { level: 1, speed: INITIAL_SPEED }
}

function Game() {
  const [snake, setSnake]                 = useState(INITIAL_SNAKE)
  const [food, setFood]                   = useState(INITIAL_FOOD)
  const [direction, setDirection]         = useState(DIRECTIONS.RIGHT)
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT)
  const [score, setScore]                 = useState(0)
  const [highScore, setHighScore]         = useState(() => {
    if (typeof window === 'undefined') return 0
    const stored = window.localStorage.getItem(HIGH_SCORE_STORAGE_KEY)
    const parsed = Number(stored)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  })
  const [level, setLevel]                 = useState(1)
  const [speed, setSpeed]                 = useState(INITIAL_SPEED)
  const [gameStatus, setGameStatus]       = useState(GAME_STATUS.START)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(HIGH_SCORE_STORAGE_KEY, String(highScore))
  }, [highScore])

  /* Shared reset — does NOT touch highScore */
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

  const handleGameTick = useCallback(() => {
    setSnake((currentSnake) => {
      if (!currentSnake || currentSnake.length === 0) {
        return INITIAL_SNAKE
      }

      const requestedDirection = nextDirection

      setDirection(requestedDirection)

      const newHead = {
        x: currentSnake[0].x + requestedDirection.x,
        y: currentSnake[0].y + requestedDirection.y,
      }

      const hitWall  = checkWallCollision(newHead, BOARD_SIZE)
      const willEat  = food !== null && checkFoodCollision(newHead, food)

      const bodyToCheck = willEat
        ? currentSnake.slice(1)
        : currentSnake.slice(1, -1)

      const hitSelf = checkSelfCollision(newHead, bodyToCheck)

      if (hitWall || hitSelf) {
        setGameStatus(GAME_STATUS.GAME_OVER)
        setHighScore((prev) => Math.max(prev, score))
        return currentSnake
      }

      const updatedSnake = moveSnake(currentSnake, requestedDirection, willEat)

      if (willEat) {
        const nextScore = score + POINTS_PER_FOOD
        setScore(nextScore)
        setHighScore((prev) => Math.max(prev, nextScore))
        const nextDifficulty = getDifficultyByScore(nextScore)
        setLevel(nextDifficulty.level)
        setSpeed(nextDifficulty.speed)
        const nextFood = generateFoodPosition(BOARD_SIZE, updatedSnake)
        if (nextFood === null) {
          setFood(null)
          setGameStatus(GAME_STATUS.GAME_OVER)
        } else {
          setFood(nextFood)
        }
      }

      return updatedSnake
    })
  }, [food, nextDirection, score])

  useGameLoop({
    isRunning: gameStatus === GAME_STATUS.RUNNING,
    speed,
    onTick: handleGameTick,
  })

  useKeyboardControls({
    gameStatus,
    currentDirection: direction,
    onDirectionChange: setNextDirection,
    onStart: handleStartGame,
    onPauseToggle: handlePauseGame,
    onRestart: handleRestartGame,
  })

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
              <div className={hudStyles.controlsGrid}>
                <span className={hudStyles.controlKey}>ARROWS / WASD</span>
                <span className={hudStyles.controlAction}>MOVE</span>
              </div>
              <div className={hudStyles.controlsGrid}>
                <span className={hudStyles.controlKey}>SPACE</span>
                <span className={hudStyles.controlAction}>PAUSE</span>
              </div>
              <div className={hudStyles.controlsGrid}>
                <span className={hudStyles.controlKey}>R</span>
                <span className={hudStyles.controlAction}>RESTART</span>
              </div>
            </HudPanel>

            <HudPanel title="PLAYER DATA">
              <div className={hudStyles.dataList}>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>CURRENT SCORE</span>
                  <span className={hudStyles.dataValue}>{pad(score)}</span>
                </div>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>HIGH SCORE</span>
                  <span className={hudStyles.dataValue}>{pad(highScore)}</span>
                </div>
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
              <div className={hudStyles.dataList}>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>STATUS</span>
                  <span className={`${styles.statusText} ${statusColorClass}`}>
                    {gameStatus}
                  </span>
                </div>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>GRID</span>
                  <span className={hudStyles.dataValue}>ONLINE</span>
                </div>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>PLAYER</span>
                  <span className={hudStyles.dataValue}>GUEST_001</span>
                </div>
              </div>
            </HudPanel>

            <HudPanel title="GRID DATA">
              <div className={hudStyles.dataList}>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>LEVEL</span>
                  <span className={hudStyles.dataValue}>{pad(level, 2)}</span>
                </div>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>SPEED</span>
                  <span className={hudStyles.dataValue}>{speed} MS</span>
                </div>
                <div className={hudStyles.dataRow}>
                  <span className={hudStyles.dataLabel}>BOARD</span>
                  <span className={hudStyles.dataValue}>20 × 20</span>
                </div>
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
