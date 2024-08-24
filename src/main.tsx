import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import App from './app/app';
import './i18n';
import store from './store';
import { colors } from './utils/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightGreen,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense fallback="...is loading">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </Suspense>
  </StrictMode>
);
