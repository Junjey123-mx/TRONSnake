import styles from './Hud.module.css'

function Score({ score = 0, highScore = 0 }) {
  const pad = (n) => String(n).padStart(6, '0')

  return (
    <div className={styles.scoreBlock}>
      <div className={styles.scoreRow}>
        <span className={styles.scoreLabel}>Score</span>
        <span className={styles.scoreValue}>{pad(score)}</span>
      </div>
      <div className={styles.scoreRow}>
        <span className={styles.scoreLabel}>High Score</span>
        <span className={styles.scoreValue}>{pad(highScore)}</span>
      </div>
    </div>
  )
}

export default Score
