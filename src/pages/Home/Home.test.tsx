import { createAsyncThunk } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { CharactersListDTO } from '../../services/characters';
import store from '../../store';
import * as fetchThunk from '../../store/characters/thunks/fetchCharacters';
import CharactersList from './Home';

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

describe('Home tests', () => {
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

    const filterByName = screen.getByTestId('filterbyName');
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

    const fulterByWork = screen.getByTestId('filterbyWork');
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
});
