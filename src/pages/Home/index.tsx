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
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
          />
          <span>durante</span>
          <MinutesAmmountInput type="number" placeholder="00" />
          <span>minutos.</span>
        </FormHeader>
        <CountDownContainer>
          <div className="countDown">
            <div className="units tensOfMinutes">0</div>
            <div className="units minutes">0</div>
            <div className="countDownSeparator" />
            <div className="units tensOfSeconds">0</div>
            <div className="units seconds">0</div>
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
