import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCharactersList } from '../../../services/characters';

export const fetchCharactersData = createAsyncThunk(
  'characters/fetchCharactersData',
  async () => {
    const results = await getCharactersList();
    console.log(results);
    return results;
  }
);
