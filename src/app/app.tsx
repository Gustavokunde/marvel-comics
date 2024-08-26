import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { LanguageSelector } from '../components/LanguageSelector';
import { Home } from '../pages/Home';
import { RootState } from '../store';

export function App() {
  const charactersError = useSelector(
    (state: RootState) => state.characters.error
  );

  return (
    <div className="min-h-screen bg-light-gray w-screen">
      <LanguageSelector />
      {charactersError && <Alert severity="error">{charactersError}</Alert>}
      <Home />
    </div>
  );
}

export default App;
