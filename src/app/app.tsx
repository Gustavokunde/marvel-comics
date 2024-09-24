import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProfile } from '../contexts/UserContext';
import Routes from '../routes';
import { RootState } from '../store';

export function App() {
  const charactersApiError = useSelector(
    (state: RootState) => state.characters.error
  );

  const { hasError, clearHasError } = useProfile();

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearHasError();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="min-h-screen bg-light-gray w-screen">
      {charactersApiError && (
        <Alert severity="error">{charactersApiError}</Alert>
      )}

      {hasError && (
        <Alert severity="error">
          An error occurred with the profile service
        </Alert>
      )}
      <Routes />
    </div>
  );
}

export default App;
