import styles from './NeonButton.module.css'

const VALID_VARIANTS = ['primary', 'secondary', 'danger']

function NeonButton({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className,
}) {
  const safeVariant = VALID_VARIANTS.includes(variant) ? variant : 'primary'

  const rootClass = [
    styles.button,
    styles[safeVariant],
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={rootClass}
    >
      <span className={styles.buttonGlow} aria-hidden="true" />
      <span className={styles.buttonText}>{children}</span>
    </button>
  )
}

export default NeonButton
