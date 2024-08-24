import { useTranslation } from 'react-i18next';
import { Character } from '../../interfaces/character';
interface Props {
  character: Character | null;
}

const worksToShow: Array<
  keyof Omit<Character, 'name' | 'id' | 'description' | 'thumbnail'>
> = ['comics', 'stories', 'series'];

const CharacterDetails = ({ character }: Props) => {
  const { t } = useTranslation(['character-details']);
  return (
    <div className="flex flex-col px-4 pb-4">
      <h1>{t('title', { name: character?.name })}</h1>
      <p>{character?.description}</p>
      {worksToShow.map((work) =>
        character && character[work]?.items.length ? (
          <figure key={work}>
            <figcaption>
              <strong>{t('workTitle.' + work)}</strong>
            </figcaption>
            <ul>
              {character[work].items.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          </figure>
        ) : null
      )}

      {!character?.comics?.returned &&
        !character?.series?.returned &&
        !character?.stories?.returned && <p>{t('noWorks')}</p>}
    </div>
  );
};

export default CharacterDetails;
