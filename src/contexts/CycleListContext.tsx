import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
import { addNewCycleAction, finishedCycleAction, interruptCurrentCycleAction } from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

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
  markCycleAsFinished: () => void;
  updateAmountSecondsPassed: (seconds: number) => void;
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
  }, (initialState) => {
    const storedStateAsJSON = localStorage.getItem('@IgniteTimer_cycle-list_1.0.0')

    if ( storedStateAsJSON ) return JSON.parse(storedStateAsJSON)

    return initialState
  });
  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )
    }
    
    return 0
  });

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

  function updateAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCycleAsFinished() {
    dispatch(finishedCycleAction())
  }

  useEffect(() => {
    const cyclesStateSTRINGFY = JSON.stringify(cyclesState)
    localStorage.setItem('@IgniteTimer_cycle-list_1.0.0', cyclesStateSTRINGFY)
  }, [cyclesState]);

  const valueObj = {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCycleAsFinished,
    updateAmountSecondsPassed,
    createNewCycle,
    handleInteruptCycle,
  };

  return (
    <CycleContext.Provider value={valueObj}>{children}</CycleContext.Provider>
  );
}
