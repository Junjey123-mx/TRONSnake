import styles from './Screens.module.css'
import NeonButton from '../ui/NeonButton'

function GameOverScreen({ score = 0, highScore = 0, onRestart, onMainMenu }) {
  const pad = (n) => String(n).padStart(6, '0')

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <h2 className={`${styles.mainTitle} ${styles.danger}`}>GAME OVER</h2>
          <p className={styles.subtitle}>SYSTEM TERMINATED</p>
        </div>

        <div className={styles.finalScores}>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>Final Score</span>
            <span className={styles.scoreValue}>{pad(score)}</span>
          </div>
          <div className={styles.scoreRow}>
            <span className={styles.scoreLabel}>High Score</span>
            <span className={styles.scoreValue}>{pad(highScore)}</span>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <NeonButton onClick={onRestart} variant="danger">RESTART</NeonButton>
          <NeonButton onClick={onMainMenu} variant="secondary">MAIN MENU</NeonButton>
        </div>
      </div>
    </div>
  )
}

export default GameOverScreen
