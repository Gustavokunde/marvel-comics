import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import Routes from '../routes';
import { RootState } from '../store';

export function App() {
  const charactersApiError = useSelector(
    (state: RootState) => state.characters.error
  );

  return (
    <div className="min-h-screen bg-light-gray w-screen">
      <Routes />

      {charactersApiError && (
        <Alert severity="error">{charactersApiError}</Alert>
      )}
    </div>
  );
}

export default App;
