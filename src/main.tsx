import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle.ts';
import { defaultThemes } from './styles/themes/default.ts';

import App from './App.tsx';
import { CycleContextProvider } from './contexts/CycleListContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultThemes}>
      <CycleContextProvider>
        <App />
      </CycleContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
);
