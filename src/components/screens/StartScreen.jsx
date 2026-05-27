import styles from './Screens.module.css'
import NeonButton from '../ui/NeonButton'

function StartScreen({ onStart }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <h1 className={styles.mainTitle}>TRON SNAKE</h1>
          <p className={styles.subtitle}>ENTER THE GRID</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.controlsGrid}>
            <span className={styles.controlKey}>WASD / ARROWS</span>
            <span className={styles.controlDesc}>Move</span>
            <span className={styles.controlKey}>SPACE</span>
            <span className={styles.controlDesc}>Pause</span>
            <span className={styles.controlKey}>R</span>
            <span className={styles.controlDesc}>Restart</span>
          </div>
        </div>

        <NeonButton onClick={onStart} variant="primary">
          START GAME
        </NeonButton>
      </div>
    </div>
  )
}

export default StartScreen
