import { HeaderContainer } from './style';

import logo from '../../assets/logo-ignite.svg';
import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" end title="Cronômetro">
          <Timer size={'2.4rem'} />
        </NavLink>
        <NavLink to="/history" end title="Histórico">
          <Scroll size={'2.4rem'} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
