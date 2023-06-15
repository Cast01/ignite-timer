import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface CycleContextProvidePropType {
  children: ReactNode;
}

interface CreateCycleDataType {
  task: string;
  minutesAmount: number;
}

export interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  finishedDate: 'finished' | 'canceled' | 'pending';
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  totalSeconds: number;
  minutes: string;
  seconds: string;
  setCycles: Dispatch<SetStateAction<Cycle[]>>;
  setActiveCycleId: Dispatch<SetStateAction<string | null>>;
  //   setSecondsPassed: (seconds: number) => void;
  //   markCurrentCycleAsFinished: () => void;
  createNewCycle: (data: CreateCycleDataType) => void;
  handleInteruptCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

export function CycleContextProvider({
  children,
}: CycleContextProvidePropType) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  console.log(cycles);

  //   function setSecondsPassed(seconds: number) {
  //     setAmountSecondsPassed(seconds);
  //   }

  //   function markCurrentCycleAsFinished() {
  //     setCycles((oldCycles) =>
  //       oldCycles.map((cycle) => {
  //         if (cycle.id === activeCycleId) {
  //           return { ...cycle, finishedDate: 'finished' };
  //         } else {
  //           return cycle;
  //         }
  //       }),
  //     );
  //   }

  function createNewCycle(data: CreateCycleDataType) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task, // Input taskName
      minutesAmmount: data.minutesAmount, // Input minutesAmmount
      startDate: new Date(),
      finishedDate: 'pending',
    };
    setCycles((oldCycles) => [...oldCycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: 'canceled' };
        } else {
          return cycle;
        }
      }),
    );
    setActiveCycleId(null);
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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
          setCycles((oldCycles) =>
            oldCycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: 'finished' };
              } else {
                return cycle;
              }
            }),
          );
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
  }, [activeCycle, totalSeconds, setActiveCycleId, activeCycleId]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    } else {
      document.title = 'Pomodoro Online';
    }
  }, [activeCycle, minutes, seconds]);

  const valueObj = {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    totalSeconds,
    minutes,
    seconds,
    setCycles,
    setActiveCycleId,
    // setSecondsPassed,
    // markCurrentCycleAsFinished,
    createNewCycle,
    handleInteruptCycle,
  };

  return (
    <CycleContext.Provider value={valueObj}>{children}</CycleContext.Provider>
  );
}
