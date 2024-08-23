import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCharactersList } from '../../../services/characters';
interface Params {
  filterByName?: string;
  filterByWork?: string;
}

export const fetchCharactersData = createAsyncThunk(
  'characters/fetchCharactersData',
  async (params?: Params) => {
    const results = await getCharactersList(params);
    return results;
  }
);
