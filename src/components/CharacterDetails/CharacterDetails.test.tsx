import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Character } from '../../interfaces/character';
import CharacterDetails from './CharacterDetails';

const character: Character = {
  name: 'character name',
  description: 'character description',
  id: 'id',
  comics: {
    items: [{ name: 'first comic' }, { name: 'second comic' }],
    returned: 2,
  },
  series: {
    items: [{ name: 'first serie' }, { name: 'second serie' }],
    returned: 2,
  },
  stories: {
    items: [{ name: 'first story' }, { name: 'second story' }],
    returned: 2,
  },
};

describe('Character Details test', () => {
  it('should check if character name, description and works are showing properly', () => {
    render(<CharacterDetails character={character} />);

    const name = screen.getByText(character.name);
    expect(name).toBeInTheDocument();

    const description = screen.getByText(character.description);
    expect(description).toBeInTheDocument();

    character.comics.items.map((comic) => {
      const name = screen.getByText(comic.name);
      expect(name).toBeInTheDocument();
    });
    character.series.items.map((serie) => {
      const name = screen.getByText(serie.name);
      expect(name).toBeInTheDocument();
    });
    character.stories.items.map((story) => {
      const name = screen.getByText(story.name);
      expect(name).toBeInTheDocument();
    });
  });

  it("should check if character comics are not showing if there aren't any comic", () => {
    render(
      <CharacterDetails
        character={{ ...character, comics: { returned: 0, items: [] } }}
      />
    );
    expect(screen.queryByText('comics')).not.toBeInTheDocument();
  });

  it("should check if character series are not showing if there aren't any serie", () => {
    render(
      <CharacterDetails
        character={{ ...character, series: { returned: 0, items: [] } }}
      />
    );
    expect(screen.queryByText('series')).not.toBeInTheDocument();
  });
  it("should check if character stories are not showing if there aren't any story", () => {
    render(
      <CharacterDetails
        character={{ ...character, stories: { returned: 0, items: [] } }}
      />
    );
    expect(screen.queryByText('stories')).not.toBeInTheDocument();
  });

  it("should show `there is no work to show when character doesn't have any work", () => {
    const emptyWork = { returned: 0, items: [] };

    render(
      <CharacterDetails
        character={{
          ...character,
          stories: emptyWork,
          series: emptyWork,
          comics: emptyWork,
        }}
      />
    );

    expect(screen.getByText('There is no work to show')).toBeInTheDocument();
  });
});
