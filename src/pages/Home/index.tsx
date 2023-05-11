import { Play } from 'phosphor-react';
import {
  CountDownContainer,
  FormFooter,
  FormHeader,
  HomeContainer,
  MinutesAmmountInput,
  TaskInput,
} from './style';

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormHeader>
          <label htmlFor="task">Vou trabalhar em</label>
          <div id="task">
            <TaskInput
              id="task"
              list="task-suggestions"
              type="text"
              placeholder="Dê um nome para o seu projeto"
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
          <button>
            <Play size={'2.4rem'} />
            <span>COMEÇAR</span>
          </button>
        </FormFooter>
      </form>
    </HomeContainer>
  );
}
