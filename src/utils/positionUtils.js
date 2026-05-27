export function arePositionsEqual(positionA, positionB) {
  return positionA.x === positionB.x && positionA.y === positionB.y;
}

export function isOutOfBounds(pos, boardSize) {
  return pos.x < 0 || pos.x >= boardSize || pos.y < 0 || pos.y >= boardSize;
}

export function randomPosition(boardSize) {
  return {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}
