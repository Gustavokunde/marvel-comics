import SearchIcon from '@mui/icons-material/Search';
import { Alert, Button, InputAdornment } from '@mui/material';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CharactersList from '../../components/CharactersList/CharactersList';
import { useProfile } from '../../contexts/UserContext';
import usePagination from '../../hooks/paginations';
import { Character } from '../../interfaces/character';
import { paths } from '../../routes';
import { AppDispatch, RootState } from '../../store';
import { fetchCharactersData } from '../../store/characters/thunks/fetchCharacters';

const CharactersFindings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState<{ name?: string; work?: string }>();

  const [characterIsSavedInfo, setCharacterIsSavedInfo] = useState(false);
  const { user, saveCharacter } = useProfile();
  const { t } = useTranslation(['characters-list']);

  const { loading, data, pagination } = useSelector(
    (state: RootState) => state.characters
  );

  const { Pagination, pageNumber } = usePagination({
    count: pagination.count,
    disabled: loading,
  });

  const fetchData = () => {
    if (!loading) {
      dispatch(
        fetchCharactersData({
          filterByName: filterBy?.name,
          filterByWork: filterBy?.work,
          page: pageNumber,
        })
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCharacterIsSavedInfo(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [characterIsSavedInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageNumber]);

  const onChangeFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;
      setFilterBy((prevState) => ({
        ...prevState,
        [name.toLowerCase()]: value,
      }));
    },
    [setFilterBy]
  );

  const inputFilterProps = (name: string) => {
    return {
      id: name,
      label: t('filterBy' + name + 'Label'),
      variant: 'outlined' as TextFieldVariants,
      name: name,
      onChange: onChangeFilter,
      inputProps: { 'data-testid': 'filterby' + name },
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon role="button" onClick={fetchData} />
          </InputAdornment>
        ),
      },
    };
  };

  const onFavoriteCharacter = (character: Character) => {
    setCharacterIsSavedInfo(false);
    saveCharacter(character).then(() => setCharacterIsSavedInfo(true));
  };

  const navigateToFavorites = () => {
    navigate(paths.FAVORITE_CHARACTERS);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 gap-8 relative">
      {characterIsSavedInfo ? (
        <div className="fixed top-0 z-10">
          <Alert severity="success">{t('favoriteCharacterSaved')}</Alert>
        </div>
      ) : null}
      <h1>
        {t('findingCharactersTitle')}
        {user?.characters?.length && user?.characters?.length > 0 ? (
          <>
            <span> {t('findingCharactersTitleSequence')}</span>
            <Button onClick={navigateToFavorites}>
              {t('findingCharactersTitleSequenceButton')}
            </Button>
          </>
        ) : null}
      </h1>

      <section className="flex flex-wrap justify-center gap-4 rounded bg-white p-4">
        <TextField {...inputFilterProps('Name')} />
        <TextField {...inputFilterProps('Work')} />
      </section>
      {loading && <p className="text-center">{t('loading')}...</p>}
      <CharactersList
        loading={loading}
        characters={data}
        onFavoriteCharacter={onFavoriteCharacter}
      />
      <Pagination />
    </div>
  );
};

export default CharactersFindings;
