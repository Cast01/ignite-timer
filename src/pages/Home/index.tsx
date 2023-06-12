import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { HandPalm, Play } from 'phosphor-react';

import { differenceInSeconds } from 'date-fns';

import {
  FormFooter,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(1).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
  startDate: Date;
  interuptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
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
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalSeconds = activeCycle ? activeCycle.minutesAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');
  const task = watch('task');
  const isSubmitDisabled = !task;
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
                return { ...cycle, finishedDate: new Date() };
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
  }, [activeCycle, totalSeconds, activeCycleId, minutes, seconds]);
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);
  console.log(cycles);
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <NewCycleForm activeCycle={activeCycle} register={register} />
        <Countdown minutes={minutes} seconds={seconds} />
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
