import styles from './Screens.module.css'
import NeonButton from '../ui/NeonButton'

function StartScreen({ onStart }) {
  return (
    <div className={styles.overlay}>
      <section className={styles.screenPanel}>

        <div className={styles.titleGroup}>
          <p className={styles.eyebrow}>GRID ACCESS</p>
          <h2 className={styles.screenTitle}>TRON SNAKE</h2>
          <p className={styles.screenSubtitle}>ENTER THE GRID</p>
        </div>

        <div className={styles.instructions}>
          <div className={styles.instructionRow}>
            <span className={styles.instructionKey}>WASD / ARROWS</span>
            <strong className={styles.instructionAction}>MOVE</strong>
          </div>
          <div className={styles.instructionRow}>
            <span className={styles.instructionKey}>SPACE</span>
            <strong className={styles.instructionAction}>PAUSE</strong>
          </div>
          <div className={styles.instructionRow}>
            <span className={styles.instructionKey}>R</span>
            <strong className={styles.instructionAction}>RESTART</strong>
          </div>
        </div>

        <NeonButton onClick={onStart} variant="primary">
          START GAME
        </NeonButton>

      </section>
    </div>
  )
}

export default StartScreen
