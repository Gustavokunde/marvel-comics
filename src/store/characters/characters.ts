import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../interfaces/character';
import { fetchCharactersData } from './thunks/fetchCharacters';

export interface CharacterState {
  loading: boolean;
  data: Array<Character>;
  error: string | null;
}

const initialState: CharacterState = {
  loading: false,
  data: [],
  error: null,
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
        state.data = action.payload;
      })
      .addCase(fetchCharactersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default characterSlice.reducer;
