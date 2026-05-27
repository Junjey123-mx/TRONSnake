import styles from './Board.module.css'
import { BOARD_SIZE } from '../../constants/gameConfig'

function Board({ snake = [], food = null, boardSize = BOARD_SIZE }) {
  const snakeSet = new Set(snake.map((s) => `${s.x},${s.y}`))
  const head = snake[0]

  const cells = []
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const key = `${col},${row}`
      const isHead  = head && head.x === col && head.y === row
      const isSnake = !isHead && snakeSet.has(key)
      const isFood  = food && food.x === col && food.y === row

      let cellClass = styles.cell
      if (isHead)       cellClass += ` ${styles.head}`
      else if (isSnake) cellClass += ` ${styles.snake}`
      else if (isFood)  cellClass += ` ${styles.food}`

      cells.push(<div key={key} className={cellClass} />)
    }
  }

  return (
    <div
      className={styles.board}
      style={{ '--board-size': boardSize }}
    >
      {cells}
    </div>
  )
}

export default Board
