import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCharactersData } from '../../store/characters/thunks/fetchCharacters';

const CharactersList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.characters
  );

  console.log(data);

  useEffect(() => {
    if (!loading) dispatch(fetchCharactersData());
  }, []);

  return (
    <div className="container-cards">
      {data &&
        data.map((character) => (
          <div>
            <div>
              <button>VER MAIS</button>
            </div>
            <span>{character.title}</span>
            <img
              src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
              alt={character.title + 'thumbnail'}
            />
          </div>
        ))}
    </div>
  );
};

export default CharactersList;
