// TODO: Implement snake movement logic
export function getNextHeadPosition(_head, _direction) {
  // TODO: return { x: head.x + direction.x, y: head.y + direction.y };
  return _head;
}

export function moveSnake(snake, _direction) {
  // TODO: const newHead = getNextHeadPosition(snake[0], direction);
  // TODO: return [newHead, ...snake.slice(0, -1)];
  return snake;
}

export function isOppositeDirection(current, next) {
  // TODO: return current.x + next.x === 0 && current.y + next.y === 0;
  return current === next;
}
