import { Character } from '../../interfaces/character';
interface Props {
  character: Character | null;
}

const worksToShow: Array<
  keyof Omit<Character, 'name' | 'id' | 'description' | 'thumbnail'>
> = ['comics', 'stories', 'series'];

const CharacterDetails = ({ character }: Props) => {
  return (
    <div className="flex flex-col px-4 pb-4">
      <h1>{character?.name}</h1>
      <p>{character?.description}</p>
      {worksToShow.map((work) =>
        character && character[work]?.items.length ? (
          <figure key={work}>
            <figcaption>
              <strong>{work}</strong>
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
        !character?.stories?.returned && <p> There is no work to show</p>}
    </div>
  );
};

export default CharacterDetails;
