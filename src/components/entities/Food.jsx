import styles from './Food.module.css'

function Food({ food, boardSize }) {
  if (!food || typeof food.x !== 'number' || typeof food.y !== 'number') return null

  return (
    <div
      className={styles.foodLayer}
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      <div
        className={styles.foodCell}
        style={{
          gridColumn: food.x + 1,
          gridRow: food.y + 1,
        }}
      >
        <div className={styles.energyCore}>
          <span className={styles.energyRing} />
        </div>
      </div>
    </div>
  )
}

export default Food
