// Snake cells are rendered directly by Board.jsx via CSS Grid.
// This component is prepared for future independent rendering if needed.

function Snake({ snake }) {
  if (!snake || snake.length === 0) return null
  // TODO: Render segments independently when decoupled from Board
  return null
}

export default Snake
