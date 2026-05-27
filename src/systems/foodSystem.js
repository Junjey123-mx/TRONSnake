// TODO: Implement food logic
export function generateFoodPosition(_snake, _boardSize) {
  // TODO: Generate random position not occupied by any snake segment
  // TODO: loop { pos = randomPosition(boardSize) } while isPositionOnSnake(pos, snake)
  return { x: 5, y: 5 };
}

export function isPositionOnSnake(position, snake) {
  // TODO: return snake.some(segment => arePositionsEqual(segment, position));
  return snake.some((s) => s.x === position.x && s.y === position.y);
}
