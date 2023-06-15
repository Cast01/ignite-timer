import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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
  interuptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setCycles: Dispatch<SetStateAction<Cycle[]>>;
  setActiveCycleId: Dispatch<SetStateAction<string | null>>;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
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

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
  }

  function createNewCycle(data: CreateCycleDataType) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task, // Input taskName
      minutesAmmount: data.minutesAmount, // Input minutesAmmount
      startDate: new Date(),
    };
    setCycles((oldCycles) => [...oldCycles, newCycle]);
    setActiveCycleId(id);
    setSecondsPassed(0);
    // reset();
  }

  function handleInteruptCycle() {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interuptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
    setActiveCycleId(null);
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const valueObj = {
    cycles,
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    setCycles,
    setActiveCycleId,
    setSecondsPassed,
    markCurrentCycleAsFinished,
    createNewCycle,
    handleInteruptCycle,
  };

  return (
    <CycleContext.Provider value={valueObj}>{children}</CycleContext.Provider>
  );
}
