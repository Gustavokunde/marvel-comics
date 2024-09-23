import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CharactersList from '../../components/CharactersList/CharactersList';
import { useProfile } from '../../contexts/UserContext';

const FavoriteCharacters = () => {
  const { user } = useProfile();
  const navigate = useNavigate();

  const onClickBack = () => {
    console.log('clicked');
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center">
      <section className="w-full">
        <IconButton id="back-link" className="self-start" onClick={onClickBack}>
          <ArrowBack htmlColor="black" />
        </IconButton>
        <label className="text-sm p-2" htmlFor="back-link">
          Voltar
        </label>
      </section>
      <h1 className="mb-4">Estes são os seus personagens favoritos</h1>
      <CharactersList loading={false} characters={user?.characters || []} />
    </div>
  );
};

export default FavoriteCharacters;
