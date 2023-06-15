import { useContext } from 'react';

import { HandPalm, Play } from 'phosphor-react';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider, useForm } from 'react-hook-form';

import { CycleContext } from '../../contexts/CycleListContext';

import {
  FormFooter,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, handleInteruptCycle } =
    useContext(CycleContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  function handleCreateNewTask(data: newCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
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
