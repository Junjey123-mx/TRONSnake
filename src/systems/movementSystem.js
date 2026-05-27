/**
 * Returns the next head position after applying direction.
 * Does not mutate head or direction.
 */
export function getNextHeadPosition(head, direction) {
  return {
    x: head.x + direction.x,
    y: head.y + direction.y,
  }
}

/**
 * Returns a new snake array after moving one step.
 * shouldGrow = true  → snake grows by one segment (food was eaten)
 * shouldGrow = false → snake slides forward (normal move)
 * Never mutates the original array.
 */
export function moveSnake(snake, direction, shouldGrow = false) {
  if (!snake || snake.length === 0) return []

  const newHead = getNextHeadPosition(snake[0], direction)
  const extended = [newHead, ...snake]

  return shouldGrow ? extended : extended.slice(0, -1)
}

/**
 * Returns true if the two directions are exact opposites.
 * Uses the property that opposite directions sum to zero on both axes.
 * Example: RIGHT {x:1,y:0} + LEFT {x:-1,y:0} = {x:0,y:0}
 */
export function isOppositeDirection(currentDirection, nextDirection) {
  return (
    currentDirection.x + nextDirection.x === 0 &&
    currentDirection.y + nextDirection.y === 0
  )
}
