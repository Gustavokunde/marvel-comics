import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CharactersListDTO,
  getCharactersList,
} from '../../../services/characters';

export const fetchCharactersData = createAsyncThunk(
  'characters/fetchCharactersData',
  async (params: CharactersListDTO) => {
    const results = await getCharactersList(params);
    return results;
  }
);
