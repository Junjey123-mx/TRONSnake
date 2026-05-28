import styles from './Board.module.css'
import { BOARD_SIZE } from '../../constants/gameConfig'
import Food from '../entities/Food'
import Snake from '../entities/Snake'

function Board({ snake = [], food = null, boardSize = BOARD_SIZE }) {
  const cells = []

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      cells.push(
        <div
          key={`${x}-${y}`}
          role="gridcell"
          className={`${styles.cell} ${styles.emptyCell}`}
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
      <Food food={food} boardSize={boardSize} />
      <Snake snake={snake} boardSize={boardSize} />
    </div>
  )
}

export default Board
