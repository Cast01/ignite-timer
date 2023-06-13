import { useForm } from 'react-hook-form';
import { FormHeader, MinutesAmmountInput, TaskInput } from './style';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { CycleContext } from '../..';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(1).max(60),
});

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0,
    },
  });

  return (
    <FormHeader>
      <label htmlFor="task">Vou trabalhar em</label>
      <div id="task">
        <TaskInput
          id="task"
          list="task-suggestions"
          type="text"
          placeholder="Dê um nome para o seu projeto"
          disabled={!!activeCycle}
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
          min={1}
          max={60}
          maxLength={2}
          disabled={!!activeCycle}
          {...register('minutesAmmount', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </div>
    </FormHeader>
  );
}
