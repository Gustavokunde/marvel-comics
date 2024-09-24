import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CharactersList from '../../components/CharactersList/CharactersList';
import { useProfile } from '../../contexts/UserContext';

const FavoriteCharacters = () => {
  const { user } = useProfile();
  const navigate = useNavigate();
  const { t } = useTranslation(['characters-list']);

  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col items-center">
      <section className="absolute w-full">
        <IconButton id="back-link" className="self-start" onClick={onClickBack}>
          <ArrowBack htmlColor="black" />
        </IconButton>
        <label className="text-sm p-2" htmlFor="back-link">
          {t('backLink')}
        </label>
      </section>
      <h1 className="mb-4">{t('favoriteCharactersTitle')}</h1>
      <CharactersList loading={false} characters={user?.characters || []} />
    </div>
  );
};

export default FavoriteCharacters;
