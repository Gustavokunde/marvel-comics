import { Alert } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { LanguageSelector } from '../components/LanguageSelector';
import { UserProvider } from '../contexts/UserContext';
import Routes from '../routes';
import { RootState } from '../store';

export function App() {
  const charactersApiError = useSelector(
    (state: RootState) => state.characters.error
  );

  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen bg-light-gray w-screen">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <LanguageSelector />
          {charactersApiError && (
            <Alert severity="error">{charactersApiError}</Alert>
          )}
          <Routes />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
