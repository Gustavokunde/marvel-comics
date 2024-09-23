import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CharacterDetailsModal from '../../components/CharacterDetails/CharacterDetails';
import CharactersList from '../../components/CharactersList/CharactersList';
import useModal from '../../hooks/modal';
import usePagination from '../../hooks/paginations';
import { Character } from '../../interfaces/character';
import { AppDispatch, RootState } from '../../store';
import { fetchCharactersData } from '../../store/characters/thunks/fetchCharacters';

const Characters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filterBy, setFilterBy] = useState<{ name?: string; work?: string }>();
  const [selectedCharacter, setSelectedItem] = useState<Character | null>(null);
  const { t } = useTranslation(['characters-list']);

  const { loading, data, pagination } = useSelector(
    (state: RootState) => state.characters
  );
  const { Modal, openModal } = useModal({
    internalContent: <CharacterDetailsModal character={selectedCharacter} />,
  });

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

  const onCharacterDetailsClick = (character: Character) => {
    setSelectedItem(character);
    openModal();
  };

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

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 gap-8 relative">
      <h1>
        Busque pelos seus personagens favoritos e salve-os clicando em cima dos
        que preferir!
      </h1>
      <Modal />
      <section className="flex flex-wrap justify-center gap-4 rounded bg-white p-4">
        <TextField {...inputFilterProps('Name')} />
        <TextField {...inputFilterProps('Work')} />
      </section>
      {loading && <p className="text-center">{t('loading')}...</p>}
      <CharactersList
        loading={loading}
        characters={data}
        onActionClick={onCharacterDetailsClick}
      />
      <Pagination />
    </div>
  );
};

export default Characters;
