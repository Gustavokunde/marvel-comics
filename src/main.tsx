import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/app';
import { UserProvider } from './contexts/UserContext';
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

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <Suspense fallback="...is loading">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <App />
            </UserProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </Suspense>
  </StrictMode>
);
