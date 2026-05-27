import styles from './NeonButton.module.css'

function NeonButton({ children, onClick, variant = 'primary', type = 'button' }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default NeonButton
