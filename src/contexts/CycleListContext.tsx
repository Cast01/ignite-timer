import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import { addNewCycleAction, finishedCycleAction, interruptCurrentCycleAction } from '../reducers/cycles/actions';

interface CycleContextProvidePropType {
  children: ReactNode;
}

interface CreateCycleDataType {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  totalSeconds: number;
  minutes: string;
  seconds: string;
  createNewCycle: (data: CreateCycleDataType) => void;
  handleInteruptCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextType);

export function CycleContextProvider({
  children,
}: CycleContextProvidePropType) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });
  const { activeCycleId, cycles } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  console.log(cycles);

  function createNewCycle(data: CreateCycleDataType) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task, // Input taskName
      minutesAmmount: data.minutesAmount, // Input minutesAmmount
      startDate: new Date(),
      finishedDate: 'pending',
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    dispatch(interruptCurrentCycleAction());
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
          dispatch(finishedCycleAction());
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDiference);
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
    createNewCycle,
    handleInteruptCycle,
  };

  return (
    <CycleContext.Provider value={valueObj}>{children}</CycleContext.Provider>
  );
}
