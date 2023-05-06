import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyle.ts';
import { defaultThemes } from './styles/themes/default.ts';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultThemes}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
);
