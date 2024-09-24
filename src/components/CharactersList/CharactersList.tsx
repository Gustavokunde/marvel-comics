import { Button, Skeleton } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CharacterDetailsModal from '../../components/CharacterDetails/CharacterDetails';
import { Character } from '../../interfaces/character';
import { colors } from '../../utils/colors';

import { Favorite } from '@mui/icons-material';
import DefaultModal from '../DefaultModal/modal';
interface Props {
  loading?: boolean;
  characters: Character[];
  onFavoriteCharacter?: (character: Character) => void;
}

const CharactersList = ({
  characters,
  loading,
  onFavoriteCharacter,
}: Props) => {
  const [selectedCharacter, setSelectedItem] = useState<Character | null>(null);
  const { t } = useTranslation(['character-details', 'characters-list']);

  const onCloseModal = () => setSelectedItem(null);

  const onCharacterDetailsClick = (character: Character) => {
    setSelectedItem(character);
  };

  return (
    <>
      {selectedCharacter && (
        <DefaultModal
          isOpen={!!selectedCharacter}
          title={t('title', { name: selectedCharacter?.name })}
          onClose={onCloseModal}
        >
          <CharacterDetailsModal character={selectedCharacter} />
        </DefaultModal>
      )}
      <div className="flex justify-center w-full flex-wrap gap-4">
        {loading &&
          Array(3)
            .fill(0)
            .map((item, index) => (
              <Skeleton
                data-testid="skeleton"
                id={'skeleton' + index}
                key={index}
                variant="rectangular"
                className="rounded"
                sx={{ bgcolor: colors.darkGreen }}
                width={320}
                height={320}
              />
            ))}
        {characters &&
          !loading &&
          characters.map((character) => (
            <div
              id={character.id}
              key={character.id}
              className="w-80 h-80 p-4 rounded 
            flex flex-col items-center justify-between 
            bg-dark-green text-white
            ease-in duration-300 hover:scale-105
            relative group
            "
            >
              <span data-testid="character-name">{character.name}</span>
              <div className="relative group shadow-md overflow-hidden">
                <img
                  data-testid="character-image"
                  className="max-w-full max-h-52 object-contain"
                  src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                  alt={character.name + 'thumbnail'}
                />
                {/* overlay on hover*/}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                {/* overlay on hover*/}
              </div>

              {onFavoriteCharacter && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Favorite
                    className="text-red-500 !text-9xl cursor-pointer"
                    onClick={() => onFavoriteCharacter(character)}
                  />
                </div>
              )}
              <Button
                id={'see-details' + character.name}
                variant="contained"
                data-testid="see-details"
                onClick={() => onCharacterDetailsClick(character)}
              >
                {t('seeDetailsButton', { ns: 'characters-list' })}
              </Button>
            </div>
          ))}
      </div>
    </>
  );
};

export default CharactersList;
