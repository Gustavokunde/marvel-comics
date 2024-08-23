import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CharactersList } from '../pages/CharactersList';

export function App() {
  const charactersError = useSelector(
    (state: RootState) => state.characters.error
  );

  return (
    <div className="min-h-screen">
      {charactersError && <Alert severity="error">{charactersError}</Alert>}
      <CharactersList />
    </div>
  );
}

export default App;
