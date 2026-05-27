import { arePositionsEqual } from '../utils/positionUtils'

/**
 * Returns true if position coincides with any snake segment.
 */
export function isPositionOnSnake(position, snake) {
  return snake.some((segment) => arePositionsEqual(segment, position))
}

/**
 * Generates a random food position that is not occupied by the snake.
 * Builds a list of all available cells, then picks one at random.
 * Returns null if the snake fills the entire board (edge case).
 */
export function generateFoodPosition(boardSize, snake) {
  const availablePositions = []

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const pos = { x, y }
      if (!isPositionOnSnake(pos, snake)) {
        availablePositions.push(pos)
      }
    }
  }

  if (availablePositions.length === 0) return null

  const randomIndex = Math.floor(Math.random() * availablePositions.length)
  return availablePositions[randomIndex]
}
