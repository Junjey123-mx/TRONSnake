import styles from './Screens.module.css'
import NeonButton from '../ui/NeonButton'

function PauseScreen({ onResume, onRestart }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <h2 className={styles.mainTitle}>PAUSED</h2>
          <p className={styles.subtitle}>SYSTEM TEMPORARILY HALTED</p>
        </div>
        <div className={styles.buttonGroup}>
          <NeonButton onClick={onResume} variant="primary">RESUME</NeonButton>
          <NeonButton onClick={onRestart} variant="secondary">RESTART</NeonButton>
        </div>
      </div>
    </div>
  )
}

export default PauseScreen
