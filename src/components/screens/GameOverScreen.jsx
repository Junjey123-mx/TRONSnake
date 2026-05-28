import styles from './Screens.module.css'
import NeonButton from '../ui/NeonButton'

function formatScore(value) {
  const safe =
    typeof value === 'number' && Number.isFinite(value)
      ? Math.max(0, Math.floor(value))
      : 0
  return String(safe).padStart(6, '0')
}

function GameOverScreen({ score = 0, highScore = 0, onRestart, onMainMenu }) {
  return (
    <div className={styles.overlay}>
      <section className={styles.gameOverPanel}>

        <div className={styles.titleGroup}>
          <p className={styles.eyebrow}>GRID FAILURE</p>
          <h2 className={styles.gameOverTitle}>GAME OVER</h2>
          <p className={styles.gameOverSubtitle}>USER SIGNAL LOST</p>
        </div>

        <div className={styles.finalScores}>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>FINAL SCORE</span>
            <strong className={styles.scoreValue}>{formatScore(score)}</strong>
          </div>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>HIGH SCORE</span>
            <strong className={styles.scoreValue}>{formatScore(highScore)}</strong>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <NeonButton onClick={onRestart} variant="danger">
            RESTART
          </NeonButton>
          <NeonButton onClick={onMainMenu} variant="secondary">
            MAIN MENU
          </NeonButton>
        </div>

      </section>
    </div>
  )
}

export default GameOverScreen
