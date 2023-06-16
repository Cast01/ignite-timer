import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
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

interface CycleStateType {
  cycles: Cycle[];
  activeCycleId: string | null;
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
  const [cyclesState, dispatch] = useReducer(
    (state: CycleStateType, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };

        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: 'canceled',
                };
              }
              return state;
            }),
            activeCycleId: null,
          };

        case 'FINISHED_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: 'finished',
                };
              }
              return state;
            }),
            activeCycleId: null,
          };

        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );
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
    // setCycles((oldCycles) => [...oldCycles, newCycle]);
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });
    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    // setCycles((oldCycles) =>
    //   oldCycles.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: 'canceled' };
    //     } else {
    //       return cycle;
    //     }
    //   }),
    // );
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    });
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
          //   setCycles((oldCycles) =>
          //     oldCycles.map((cycle) => {
          //       if (cycle.id === activeCycleId) {
          //         return { ...cycle, finishedDate: 'finished' };
          //       } else {
          //         return cycle;
          //       }
          //     }),
          //   );
          dispatch({
            type: 'FINISHED_CYCLE',
            payload: {
              activeCycleId,
            },
          });
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
