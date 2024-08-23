import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../interfaces/character';
import { fetchCharactersData } from './thunks/fetchCharacters';

export interface CharacterState {
  loading: boolean;
  data: Array<Character>;
  error: string | null;
  pagination: {
    total: number;
    count: number;
  };
}

const initialState: CharacterState = {
  loading: false,
  data: [],
  error: null,
  pagination: {
    total: 0,
    count: 0,
  },
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharactersData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        const { count, total } = action.payload;
        state.pagination = { total, count };
      })
      .addCase(fetchCharactersData.rejected, (state, action) => {
        if (action.error.code === 'ERR_NETWORK') {
          state.error =
            'There was a failure in your internet connection, please check it and try again.';
          return;
        }
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default characterSlice.reducer;
