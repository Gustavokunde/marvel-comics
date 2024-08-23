import { createAsyncThunk } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { CharactersListDTO } from 'src/services/characters';
import store from '../../store';
import * as fetchThunk from '../../store/characters/thunks/fetchCharacters';
import CharactersList from './CharactersList';

const fetchCharactersData = vi.spyOn(fetchThunk, 'fetchCharactersData');

fetchCharactersData.mockImplementation(
  createAsyncThunk('characters/fetchCharactersData', async () => ({
    results: [{ name: 'card name' }],
  }))
);
vi.mock('@mui/icons-material/Search', () => {
  return {
    __esModule: true,
    default: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props} data-testid="SearchIcon"></button>
    ),
  };
});

describe('Characters list tests', () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <CharactersList />
      </Provider>
    );

  it("should check if it's fetching data on first render", async () => {
    renderComponent();
    await waitFor(() => {
      expect(fetchCharactersData).toHaveBeenCalled();
    });
  });

  it("should check if it's showing pagination properly", () => {
    renderComponent();
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });
  it('should check if filter by name triggers another api request with name param', async () => {
    const mockedFetch = createAsyncThunk(
      'fetch-thunk',
      async (params: CharactersListDTO) => {
        return { results: [], data: {} };
      }
    );
    const charactersThunk =
      fetchCharactersData.mockImplementationOnce(mockedFetch);
    renderComponent();

    const filterByName = screen.getByTestId('filterbyname');
    fireEvent.change(filterByName, { target: { value: 'value' } });

    act(() => {
      const searchIcon = screen.getAllByTestId('SearchIcon')[0];
      searchIcon.click();
    });

    await waitFor(() => {
      expect(charactersThunk).toHaveBeenCalledWith(
        expect.objectContaining({
          filterByName: 'value',
        })
      );
    });
  });
  it('should check if filter by work triggers another api request with work param', async () => {
    const mockedFetch = createAsyncThunk(
      'fetch-thunk',
      async (params: CharactersListDTO) => {
        return { results: [], data: {} };
      }
    );
    const charactersThunk =
      fetchCharactersData.mockImplementationOnce(mockedFetch);
    renderComponent();

    const fulterByWork = screen.getByTestId('filterbywork');
    fireEvent.change(fulterByWork, { target: { value: 'value' } });

    act(() => {
      const searchIcon = screen.getAllByTestId('SearchIcon')[1];
      searchIcon.click();
    });

    await waitFor(() => {
      expect(charactersThunk).toHaveBeenCalledWith(
        expect.objectContaining({
          filterByWork: 'value',
        })
      );
    });
  });
  it('should show skeleton component when fetch is loading', async () => {
    renderComponent();

    await waitFor(() => {
      const skeletonComponents = screen.getAllByTestId('skeleton');
      expect(skeletonComponents).toHaveLength(3);
    });
  });
  it('should open a modal with the character description when clicking in see details button', async () => {
    fetchCharactersData.mockImplementationOnce(
      createAsyncThunk('characters/fetchCharactersData', async () => ({
        results: [{ name: 'card name' }],
      }))
    );

    renderComponent();

    await waitFor(() => {
      screen.getByTestId('see-details').click();
    });

    const modal = screen.getByTestId('modal-content');
    expect(modal).toBeInTheDocument();
  });
  it('should show character name and image', async () => {
    fetchCharactersData.mockImplementationOnce(
      createAsyncThunk('characters/fetchCharactersData', async () => ({
        results: [
          {
            name: 'card name',
            thumbnail: { path: 'path', extension: 'extension' },
          },
        ],
      }))
    );

    renderComponent();

    await waitFor(() => {
      const characterName = screen.getByTestId('character-name');
      expect(characterName).toBeInTheDocument();
      const characterImage = screen.getByTestId('character-image');
      expect(characterImage).toBeInTheDocument();
    });
  });
});
