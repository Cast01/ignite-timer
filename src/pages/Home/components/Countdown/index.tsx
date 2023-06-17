import { useContext, useEffect } from 'react';
import { CountDownContainer } from './style';
import { CycleContext } from '../../../../contexts/CycleListContext';
import { differenceInSeconds } from 'date-fns';

export function Countdown() {
  const { activeCycle, amountSecondsPassed, updateAmountSecondsPassed, markCycleAsFinished, activeCycleId } = useContext(CycleContext);

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
          new Date(activeCycle.startDate),
        );
        if (secondsDiference >= totalSeconds) {
          markCycleAsFinished();
          updateAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          updateAmountSecondsPassed(secondsDiference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    } else {
      document.title = 'Ignite Timer';
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
