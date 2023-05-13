import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { Play } from 'phosphor-react';

import {
  CountDownContainer,
  FormFooter,
  FormHeader,
  HomeContainer,
  MinutesAmmountInput,
  TaskInput,
} from './style';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(5).max(60),
});

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  function handleCreateNewTask(data: any) {
    console.log(data);
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormHeader>
          <label htmlFor="task">Vou trabalhar em</label>
          <div id="task">
            <TaskInput
              id="task"
              list="task-suggestions"
              type="text"
              placeholder="Dê um nome para o seu projeto"
              {...register('task')}
            />
            <datalist id="task-suggestions">
              <option value="Projeto 1" />
              <option value="Projeto 2" />
              <option value="Projeto 3" />
              <option value="Banana" />
            </datalist>
          </div>
          <div className="minutesAmmountWrapper">
            <label htmlFor="minutesAmmount">durante</label>
            <MinutesAmmountInput
              id="minutesAmmount"
              type="number"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              maxLength={2}
              {...register('minutesAmmount', { valueAsNumber: true })}
            />
            <span>minutos.</span>
          </div>
        </FormHeader>
        <CountDownContainer>
          <div className="countDown">
            <div className="minutes">
              <div className="units">1</div>
              <div className="units">5</div>
            </div>
            <div className="countDownSeparator" />
            <div className="seconds">
              <div className="units">5</div>
              <div className="units">9</div>
            </div>
          </div>
        </CountDownContainer>
        <FormFooter>
          <button disabled={isSubmitDisabled}>
            <Play size={'2.4rem'} />
            <span>COMEÇAR</span>
          </button>
        </FormFooter>
      </form>
    </HomeContainer>
  );
}
