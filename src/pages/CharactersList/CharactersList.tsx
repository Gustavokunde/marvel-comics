import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../hooks/paginations';
import { AppDispatch, RootState } from '../../store';
import { fetchCharactersData } from '../../store/characters/thunks/fetchCharacters';

const CharactersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filterBy, setFilterBy] = useState<{ name?: string; work?: string }>();

  const { loading, data, pagination, error } = useSelector(
    (state: RootState) => state.characters
  );

  const { Pagination, pageNumber } = usePagination({
    count: pagination.count,
    disabled: loading,
  });

  const fetchData = useCallback(() => {
    if (!loading)
      return dispatch(
        fetchCharactersData({
          filterByName: filterBy?.name,
          filterByWork: filterBy?.work,
          page: pageNumber,
        })
      );
  }, [pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData, pageNumber]);

  const onChangeFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const name = event.target.name;
      setFilterBy((prevState) => ({ ...prevState, [name]: value }));
    },
    [setFilterBy]
  );

  const inputFilterProps = (name: string) => {
    return {
      id: name,
      label: 'Filter by ' + name,
      variant: 'outlined' as TextFieldVariants,
      name: name,
      onChange: onChangeFilter,
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
    <div className="flex flex-col items-center justify-center w-full p-4">
      <section className="flex flex-wrap gap-4">
        <TextField {...inputFilterProps('name')} />
        <TextField {...inputFilterProps('work')} />
      </section>
      <div className="flex justify-center flex-wrap gap-4">
        {data &&
          data.map((character) => (
            <div
              key={character.id}
              className="w-80 flex flex-col items-center justify-between rounded"
            >
              <span>{character.name}</span>
              <img
                src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                alt={character.name + 'thumbnail'}
              />
              <button>See details</button>
            </div>
          ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CharactersList;
