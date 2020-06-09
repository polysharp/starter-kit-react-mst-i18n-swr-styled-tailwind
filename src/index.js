import React from 'react';
import ReactDOM from 'react-dom';

import 'mobx-react/batchingForReactDom';

import { StoreContextProvider } from 'store';
import { ThemeContextProvider, ThemeProvider } from 'theme';

import 'translation/i18n';
import 'styles/tailwind.generated.css';

import { GlobalStyle } from 'components';
import Router from './router/Router';

ReactDOM.render(
  <React.StrictMode>
    <StoreContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </ThemeContextProvider>
    </StoreContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
