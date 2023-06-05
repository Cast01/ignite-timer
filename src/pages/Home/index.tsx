import { useState } from 'react';
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

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmmount: number;
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
      task: data.task,
      minutesAmmount: data.minutesAmmount,
    };

    setCycles((oldCycles) => [...oldCycles, newCycle]);
    setActiveCycleId(id);

    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  console.log({
    totalSeconds,
    currentSeconds,
    minutesAmount,
    secondsAmount,
  });
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
              <div className="units">{minutes[0]}</div>
              <div className="units">{minutes[1]}</div>
            </div>
            <div className="countDownSeparator" />
            <div className="seconds">
              <div className="units">{seconds[0]}</div>
              <div className="units">{seconds[1]}</div>
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
