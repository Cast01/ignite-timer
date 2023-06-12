import { UseFormRegister } from 'react-hook-form';
import { Cycle } from '..';
import { FormHeader, MinutesAmmountInput, TaskInput } from './style';

interface NewCycleFormPropsType {
  activeCycle: Cycle | undefined;
  register: UseFormRegister<{
    task: string;
    minutesAmmount: number;
  }>;
}

export function NewCycleForm({ activeCycle, register }: NewCycleFormPropsType) {
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
