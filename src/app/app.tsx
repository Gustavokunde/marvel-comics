import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { LanguageSelector } from '../components/LanguageSelector';
import { CharactersList } from '../pages/CharactersList';
import { RootState } from '../store';

export function App() {
  const charactersError = useSelector(
    (state: RootState) => state.characters.error
  );

  return (
    <div className="min-h-screen">
      <LanguageSelector />
      {charactersError && <Alert severity="error">{charactersError}</Alert>}
      <CharactersList />
    </div>
  );
}

export default App;
