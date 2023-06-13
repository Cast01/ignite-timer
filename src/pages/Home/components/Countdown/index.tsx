import { useContext, useEffect, useState } from 'react';
import { CountDownContainer } from './style';
import { CycleContext } from '../..';
import { differenceInSeconds } from 'date-fns';

export function Countdown() {
  const { activeCycle, setActiveCycleId, markCurrentCycleAsFinished } =
    useContext(CycleContext);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

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
          setAmountSecondsPassed(totalSeconds);
          setActiveCycleId(null);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDiference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, setActiveCycleId, markCurrentCycleAsFinished]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
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
