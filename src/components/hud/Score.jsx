import styles from './Hud.module.css'

function formatScore(value) {
  const safe =
    typeof value === 'number' && Number.isFinite(value)
      ? Math.max(0, Math.floor(value))
      : 0
  return String(safe).padStart(6, '0')
}

function Score({ score = 0, highScore = 0 }) {
  return (
    <section className={styles.scorePanel}>
      <div className={styles.scoreBlock}>
        <span className={styles.scoreLabel}>SCORE</span>
        <strong className={styles.scoreValue}>{formatScore(score)}</strong>
      </div>
      <div className={styles.scoreBlock}>
        <span className={styles.scoreLabel}>HIGH SCORE</span>
        <strong className={styles.scoreValue}>{formatScore(highScore)}</strong>
      </div>
    </section>
  )
}

export default Score
