import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { HandPalm, Play } from 'phosphor-react';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider, useForm } from 'react-hook-form';

import {
  FormFooter,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style';

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
  amountSecondsPassed: number;
  setActiveCycleId: Dispatch<SetStateAction<string | null>>;
  setSecondsPassed: (seconds: number) => void;
  markCurrentCycleAsFinished: () => void;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(1).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const CycleContext = createContext({} as CycleContextDatasType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0,
    },
  });

  function handleCreateNewTask(data: newCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task, // Input taskName
      minutesAmmount: data.minutesAmmount, // Input minutesAmmount
      startDate: new Date(),
    };
    setCycles((oldCycles) => [...oldCycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
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

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  const { handleSubmit, watch, reset } = newCycleForm;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            setActiveCycleId,
            setSecondsPassed,
            markCurrentCycleAsFinished,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>
        <FormFooter>
          {activeCycle ? (
            <StopCountdownButton type="button" onClick={handleInteruptCycle}>
              <HandPalm size={'2.4rem'} />
              <span>PARAR</span>
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={'2.4rem'} />
              <span>COMEÇAR</span>
            </StartCountdownButton>
          )}
        </FormFooter>
      </form>
    </HomeContainer>
  );
}
