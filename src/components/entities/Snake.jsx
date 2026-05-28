import styles from './Snake.module.css'

function Snake({ snake, boardSize }) {
  if (!Array.isArray(snake) || snake.length === 0) return null

  const head = snake[0]
  const body = snake.slice(1)

  return (
    <div
      className={styles.snakeLayer}
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {body.map((segment) => (
        <div
          key={`body-${segment.x}-${segment.y}`}
          className={`${styles.segment} ${styles.bodySegment}`}
          style={{
            gridColumn: segment.x + 1,
            gridRow: segment.y + 1,
          }}
        >
          <div className={styles.segmentCore} />
        </div>
      ))}
      <div
        className={`${styles.segment} ${styles.headSegment}`}
        style={{
          gridColumn: head.x + 1,
          gridRow: head.y + 1,
        }}
      >
        <div className={styles.headCore} />
      </div>
    </div>
  )
}

export default Snake
