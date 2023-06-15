import { useContext, useEffect } from 'react';
import { CountDownContainer } from './style';
import { differenceInSeconds } from 'date-fns';
import { CycleContext } from '../../../../contexts/CycleListContext';

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    setActiveCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );
        if (secondsDiference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          setActiveCycleId(null);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDiference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    setActiveCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    } else {
      document.title = 'Pomodoro Online';
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <CountDownContainer>
      <div className="countDown">
        <div className="minutes">
          <div className="units">{minutes[0]}</div>
          <div className="units">{minutes[1]}</div>
        </div>
        <div className="countDownSeparator" />
        <div className="seconds">
          <div className="units">{seconds[0]}</div>
          <div className="units">{seconds[1]}</div>
        </div>
      </div>
    </CountDownContainer>
  );
}
