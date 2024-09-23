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

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState<{ name?: string; work?: string }>();

  const [characterIsSaved, setCharacterIsSaved] = useState(false);
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
      setCharacterIsSaved(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [characterIsSaved]);

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

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
    setCharacterIsSaved(false);
    saveCharacter(character).then(() => setCharacterIsSaved(true));
  };

  const navigateToFavorites = () => {
    navigate(paths.FAVORITE_CHARACTERS);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 gap-8 relative">
      <h1>
        Busque pelos seus personagens favoritos e salve-os clicando em cima dos
        que desejar
        {user?.characters?.length && user?.characters?.length > 0 && (
          <>
            <span> ou</span>
            <Button onClick={navigateToFavorites}>Veja seus favoritos</Button>
          </>
        )}
      </h1>
      {characterIsSaved && (
        <Alert severity="success">Personagem salvo com sucesso</Alert>
      )}
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

export default Characters;
