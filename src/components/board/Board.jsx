import styles from './Board.module.css'
import { arePositionsEqual } from '../../utils/positionUtils'
import { BOARD_SIZE } from '../../constants/gameConfig'

function Board({ snake = [], food = null, boardSize = BOARD_SIZE }) {
  const snakeHead = snake[0] ?? null
  // Set for O(1) body lookup — body excludes the head
  const bodySet = new Set(snake.slice(1).map((s) => `${s.x},${s.y}`))

  const cells = []

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cellIsHead  = snakeHead !== null && arePositionsEqual(snakeHead, { x, y })
      const cellIsBody  = !cellIsHead && bodySet.has(`${x},${y}`)
      const cellIsFood  = !cellIsHead && !cellIsBody && food !== null && arePositionsEqual(food, { x, y })
      const cellIsEmpty = !cellIsHead && !cellIsBody && !cellIsFood

      const cellClass = [
        styles.cell,
        cellIsHead  ? styles.snakeHead : null,
        cellIsBody  ? styles.snakeBody : null,
        cellIsFood  ? styles.foodCell  : null,
        cellIsEmpty ? styles.emptyCell : null,
      ].filter(Boolean).join(' ')

      cells.push(
        <div
          key={`${x}-${y}`}
          role="gridcell"
          className={cellClass}
        />
      )
    }
  }

  return (
    <div
      role="grid"
      aria-label="TRON Snake game board"
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {cells}
    </div>
  )
}

export default Board
