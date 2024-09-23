import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CharactersList from './CharactersList';

describe('Characters List tests', () => {
  it('should show skeleton component when fetch is loading', async () => {
    render(<CharactersList loading={true} characters={[]} />);

    const skeletonComponents = screen.getAllByTestId('skeleton');
    expect(skeletonComponents).toHaveLength(3);
  });
  it('should call actionClick when clicking in see details button', () => {
    const actionClick = vi.fn();
    const character = {
      name: 'card name',
      description: 'card description',
      id: 'id',
    };
    render(<CharactersList loading={false} characters={[character]} />);

    screen.getByTestId('see-details').click();

    expect(actionClick).toHaveBeenCalledWith(character);
  });
  it('should show character name and image', async () => {
    render(
      <CharactersList
        loading={false}
        characters={[
          { name: 'card name', description: 'card description', id: 'id' },
        ]}
      />
    );

    const characterName = screen.getByTestId('character-name');
    expect(characterName).toBeInTheDocument();
    const characterImage = screen.getByTestId('character-image');
    expect(characterImage).toBeInTheDocument();
  });
});
