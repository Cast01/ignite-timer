import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { LayoutContainer } from './style';
import { useEffect, useState } from 'react';

export function DefaultLayout() {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight);
  }, []);

  return (
    <LayoutContainer screenHeight={screenHeight}>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
