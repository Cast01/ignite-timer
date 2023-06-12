import { CountDownContainer } from './style';

interface CountdownPropsType {
  minutes: string;
  seconds: string;
}

export function Countdown({ minutes, seconds }: CountdownPropsType) {
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
