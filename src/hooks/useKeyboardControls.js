import { useEffect } from 'react'
import { DIRECTIONS } from '../constants/directions'
import { GAME_STATUS } from '../constants/gameStatus'
import { isOppositeDirection } from '../systems/movementSystem'

const KEY_TO_DIRECTION = {
  ArrowUp:    DIRECTIONS.UP,
  ArrowDown:  DIRECTIONS.DOWN,
  ArrowLeft:  DIRECTIONS.LEFT,
  ArrowRight: DIRECTIONS.RIGHT,
  w: DIRECTIONS.UP,
  W: DIRECTIONS.UP,
  s: DIRECTIONS.DOWN,
  S: DIRECTIONS.DOWN,
  a: DIRECTIONS.LEFT,
  A: DIRECTIONS.LEFT,
  d: DIRECTIONS.RIGHT,
  D: DIRECTIONS.RIGHT,
}

export function useKeyboardControls({
  gameStatus,
  currentDirection,
  onDirectionChange,
  onStart,
  onPauseToggle,
  onRestart,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      const { key, code } = event

      // ── Direction keys (arrows + WASD) ───────────
      const requestedDirection = KEY_TO_DIRECTION[key]
      if (requestedDirection) {
        event.preventDefault()
        if (gameStatus === GAME_STATUS.RUNNING) {
          if (!isOppositeDirection(currentDirection, requestedDirection)) {
            if (typeof onDirectionChange === 'function') {
              onDirectionChange(requestedDirection)
            }
          }
        }
        return
      }

      // ── Space key ────────────────────────────────
      if (code === 'Space') {
        event.preventDefault()
        if (gameStatus === GAME_STATUS.START) {
          if (typeof onStart === 'function') onStart()
        } else if (
          gameStatus === GAME_STATUS.RUNNING ||
          gameStatus === GAME_STATUS.PAUSED
        ) {
          if (typeof onPauseToggle === 'function') onPauseToggle()
        }
        return
      }

      // ── R key — restart from any state ───────────
      if (key === 'r' || key === 'R') {
        event.preventDefault()
        if (typeof onRestart === 'function') onRestart()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    gameStatus,
    currentDirection,
    onDirectionChange,
    onStart,
    onPauseToggle,
    onRestart,
  ])
}
