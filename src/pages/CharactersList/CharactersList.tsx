import SearchIcon from '@mui/icons-material/Search';
import { Button, InputAdornment, Skeleton } from '@mui/material';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CharacterDetailsModal from '../../components/CharacterDetails/CharacterDetails';
import useModal from '../../hooks/modal';
import usePagination from '../../hooks/paginations';
import { Character } from '../../interfaces/character';
import { AppDispatch, RootState } from '../../store';
import { fetchCharactersData } from '../../store/characters/thunks/fetchCharacters';
import { colors } from '../../utils/colors';

const CharactersList = () => {
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
    <div className="flex flex-col items-center justify-center w-full p-4 gap-8">
      <Modal />
      <section className="flex flex-wrap justify-center gap-4">
        <TextField {...inputFilterProps('Name')} />
        <TextField {...inputFilterProps('Work')} />
      </section>
      {loading && <p className="text-center">{t('loading')}</p>}
      <div className="flex justify-center w-full flex-wrap gap-4">
        {loading &&
          Array(3)
            .fill(0)
            .map((item, index) => (
              <Skeleton
                data-testid="skeleton"
                key={index}
                variant="rectangular"
                className="rounded"
                sx={{ bgcolor: colors.darkGreen }}
                width={320}
                height={320}
              />
            ))}
        {data &&
          !loading &&
          data.map((character) => (
            <div
              key={character.id}
              className="w-80 h-80 p-4 rounded 
              flex flex-col items-center justify-between 
              bg-dark-green text-white
              ease-in duration-300 hover:scale-105"
            >
              <span data-testid="character-name">{character.name}</span>
              <img
                data-testid="character-image"
                className="max-w-full max-h-52 object-contain"
                src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                alt={character.name + 'thumbnail'}
              />
              <Button
                variant="contained"
                data-testid="see-details"
                onClick={() => onCharacterDetailsClick(character)}
              >
                {t('seeDetailsButton')}
              </Button>
            </div>
          ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CharactersList;
