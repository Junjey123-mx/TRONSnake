import styles from './Screens.module.css'
import NeonButton from '../ui/NeonButton'

function PauseScreen({ onResume, onRestart }) {
  return (
    <div className={styles.overlay}>
      <section className={styles.pausePanel}>

        <div className={styles.titleGroup}>
          <p className={styles.eyebrow}>GRID HOLD</p>
          <h2 className={styles.pauseTitle}>PAUSED</h2>
          <p className={styles.pauseSubtitle}>SYSTEM TEMPORARILY HALTED</p>
        </div>

        <div className={styles.pauseStatusBox}>
          <div className={styles.pauseStatusRow}>
            <span>CORE STATUS</span>
            <strong>STABLE</strong>
          </div>
          <div className={styles.pauseStatusRow}>
            <span>INPUT</span>
            <strong>STANDBY</strong>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <NeonButton onClick={onResume} variant="primary">
            RESUME
          </NeonButton>
          <NeonButton onClick={onRestart} variant="secondary">
            RESTART
          </NeonButton>
        </div>

      </section>
    </div>
  )
}

export default PauseScreen
