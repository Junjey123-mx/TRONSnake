import { useState } from 'react'
import styles from './Game.module.css'
import Board from '../board/Board'
import Score from '../hud/Score'
import HudPanel from '../hud/HudPanel'
import StartScreen from '../screens/StartScreen'
import { INITIAL_SNAKE, INITIAL_FOOD, BOARD_SIZE, INITIAL_SPEED } from '../../constants/gameConfig'
import { GAME_STATUS } from '../../constants/gameStatus'

const MOCK_SCORE = 120
const MOCK_HIGH_SCORE = 2450

function Game() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.START)

  const handleStart = () => setGameStatus(GAME_STATUS.RUNNING)

  return (
    <div className={styles.gameWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>TRON SNAKE</h1>
        <p className={styles.titleSub}>GRID INITIALIZED</p>
      </header>

      {/* Main layout: left panel — board — right panel */}
      <main className={styles.mainArea}>
        {/* Left panel */}
        <aside className={styles.sidePanel}>
          <HudPanel title="Score Data">
            <Score score={MOCK_SCORE} highScore={MOCK_HIGH_SCORE} />
          </HudPanel>

          <HudPanel title="Controls">
            <div className={styles.controlsList}>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>W A S D</span>
                <span className={styles.controlDesc}>Move</span>
              </div>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>ARROWS</span>
                <span className={styles.controlDesc}>Move</span>
              </div>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>SPACE</span>
                <span className={styles.controlDesc}>Pause</span>
              </div>
              <div className={styles.controlItem}>
                <span className={styles.controlKey}>R</span>
                <span className={styles.controlDesc}>Restart</span>
              </div>
            </div>
          </HudPanel>
        </aside>

        {/* Board */}
        <div className={styles.boardWrapper}>
          <Board
            snake={INITIAL_SNAKE}
            food={INITIAL_FOOD}
            boardSize={BOARD_SIZE}
          />
          {gameStatus === GAME_STATUS.START && (
            <StartScreen onStart={handleStart} />
          )}
        </div>

        {/* Right panel */}
        <aside className={styles.sidePanel}>
          <HudPanel title="System Status">
            <div className={styles.statsList}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Level</span>
                <span className={styles.statValue}>01</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Speed</span>
                <span className={styles.statValue}>{INITIAL_SPEED} MS</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Status</span>
                <span className={styles.statValueActive}>{gameStatus}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Length</span>
                <span className={styles.statValue}>{INITIAL_SNAKE.length}</span>
              </div>
            </div>
          </HudPanel>
        </aside>
      </main>

      {/* System feed */}
      <footer className={styles.systemFeed}>
        <span className={styles.feedItem}>▸ GRID ONLINE</span>
        <span className={styles.feedSep}>|</span>
        <span className={styles.feedItem}>▸ ENERGY CORE DETECTED</span>
        <span className={styles.feedSep}>|</span>
        <span className={styles.feedItem}>▸ SYSTEM ACTIVE</span>
        <span className={styles.feedSep}>|</span>
        <span className={styles.feedItem}>▸ PLAYER READY</span>
      </footer>
    </div>
  )
}

export default Game
