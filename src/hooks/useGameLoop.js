import { useEffect } from 'react';

export function useGameLoop({ isRunning, speed, onTick }) {
  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    if (typeof onTick !== 'function') {
      return undefined;
    }

    if (typeof speed !== 'number' || !Number.isFinite(speed) || speed <= 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      onTick();
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, speed, onTick]);
}
