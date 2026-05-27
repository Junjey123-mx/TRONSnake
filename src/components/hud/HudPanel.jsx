import styles from './Hud.module.css'

function HudPanel({ title, children }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>{title}</span>
      </div>
      <div className={styles.panelBody}>
        {children}
      </div>
    </div>
  )
}

export default HudPanel
