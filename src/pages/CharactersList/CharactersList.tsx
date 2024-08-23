import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCharactersData } from '../../store/characters/thunks/fetchCharacters';

const CharactersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [filterBy, setFilterBy] = useState<{ name?: string; work?: string }>();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (!loading)
      return dispatch(
        fetchCharactersData({
          filterByName: filterBy?.name,
          filterByWork: filterBy?.work,
        })
      );
  };

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
      <section className="flex gap-4">
        <TextField {...inputFilterProps('name')} />
        <TextField {...inputFilterProps('work')} />
      </section>
      <div>
        <div className="flex flex-wrap gap-4">
          {data &&
            data.map((character) => (
              <div
                key={character.id}
                className="w-80 flex flex-col items-center justify-between rounded"
              >
                <button>See details</button>
                <span>{character.name}</span>
                <img
                  src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                  alt={character.name + 'thumbnail'}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersList;
