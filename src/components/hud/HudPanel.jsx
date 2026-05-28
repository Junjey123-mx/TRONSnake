import styles from './Hud.module.css'

function HudPanel({ title, children, className }) {
  const rootClass = className
    ? `${styles.hudPanel} ${className}`
    : styles.hudPanel

  return (
    <section className={rootClass}>
      {title && (
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>{title}</span>
        </div>
      )}
      <div className={styles.panelBody}>
        {children}
      </div>
    </section>
  )
}

export default HudPanel
