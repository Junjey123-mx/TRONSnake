import { arePositionsEqual } from '../utils/positionUtils'

/**
 * Returns true if position is outside the board boundaries.
 * Valid range: 0 to boardSize - 1 on both axes.
 */
export function checkWallCollision(position, boardSize) {
  return (
    position.x < 0 ||
    position.x >= boardSize ||
    position.y < 0 ||
    position.y >= boardSize
  )
}

/**
 * Returns true if head overlaps any segment in snakeBody.
 * snakeBody should NOT include the head itself.
 */
export function checkSelfCollision(head, snakeBody) {
  return snakeBody.some((segment) => arePositionsEqual(head, segment))
}

/**
 * Returns true if head and food share the same position.
 */
export function checkFoodCollision(head, food) {
  return arePositionsEqual(head, food)
}
