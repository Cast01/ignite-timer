import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { HandPalm, Play } from 'phosphor-react';

import {
  FormFooter,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

export interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  interuptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextDatasType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  setActiveCycleId: Dispatch<SetStateAction<string | null>>;
  markCurrentCycleAsFinished: () => void;
}

export const CycleContext = createContext({} as CycleContextDatasType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  //   function handleCreateNewTask(data: newCycleFormData) {
  //     const id = String(new Date().getTime());
  //     const newCycle: Cycle = {
  //       id,
  //       task: data.task, // Input taskName
  //       minutesAmmount: data.minutesAmmount, // Input minutesAmmount
  //       startDate: new Date(),
  //     };
  //     setCycles((oldCycles) => [...oldCycles, newCycle]);
  //     setActiveCycleId(id);
  //     setAmountSecondsPassed(0);
  //     reset();
  //   }

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

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  //   const task = watch('task');
  //   const isSubmitDisabled = !task;

  console.log(cycles);
  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewTask)} */>
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            setActiveCycleId,
            markCurrentCycleAsFinished,
          }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CycleContext.Provider>
        <FormFooter>
          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInteruptCycle}>
              <HandPalm size={'2.4rem'} />
              <span>PARAR</span>
            </StopCountdownButton>
          ) : (
            <StartCountdownButton
              /* disabled={isSubmitDisabled} */ type="submit"
            >
              <Play size={'2.4rem'} />
              <span>COMEÇAR</span>
            </StartCountdownButton>
          )}
        </FormFooter>
      </form>
    </HomeContainer>
  );
}
