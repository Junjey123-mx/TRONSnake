import styles from './Board.module.css'
import { arePositionsEqual } from '../../utils/positionUtils'
import { BOARD_SIZE } from '../../constants/gameConfig'
import Snake from '../entities/Snake'

function Board({ snake = [], food = null, boardSize = BOARD_SIZE }) {
  const cells = []

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cellIsFood = food !== null && arePositionsEqual(food, { x, y })

      const cellClass = [
        styles.cell,
        cellIsFood ? styles.foodCell : styles.emptyCell,
      ].join(' ')

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
      <Snake snake={snake} boardSize={boardSize} />
    </div>
  )
}

export default Board
