import { Play } from 'phosphor-react';
import { HomeContainer } from './style';

export function Home() {
  return (
    <HomeContainer>
      <form>
        <header>
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
          />
          <label htmlFor="minutesAmmount">durante</label>
          <input id="minutesAmmount" type="number" />
          <span>minutos.</span>
        </header>
        <section>
          <div className="countDown">
            <div className="units tensOfMinutes">0</div>
            <div className="units minutes">0</div>
            <div className="stopwatch" />
            <div className="units tensOfSeconds">0</div>
            <div className="units seconds">0</div>
          </div>
        </section>
        <footer>
          <button>
            <Play size={'2.4rem'} />
            <span>COMEÇAR</span>
          </button>
        </footer>
      </form>
    </HomeContainer>
  );
}
