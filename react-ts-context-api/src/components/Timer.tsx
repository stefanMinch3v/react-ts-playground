import { useEffect, useRef, useState } from 'react';
import { Timer as TimerProps, useTimersContext} from '../store/timers-context.tsx';
import Container from './UI/Container.tsx';

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000); // ms
  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
    interval.current = 0;
  }

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      // side-effect
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50);
    } else if (!isRunning && interval.current) {
      clearInterval(interval.current)
    }

    return () => clearInterval(timer); // clean-up function always at the end
  }, [isRunning]); // when arr changes it runs the func, initially will run only once since the arr is []
  
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{ name }</h2>
      <p><progress max={duration * 1000} value={remainingTime}/></p>
      <p>{ formattedRemainingTime }</p>
    </Container>
  );
}
