import api from './api';

export interface CharactersListDTO {
  filterByName?: string;
  filterByWork?: string;
  page: number;
}

const offset = 20;

export const getCharactersList = async (params: CharactersListDTO) => {
  return await api
    .get('characters', {
      params: {
        offset: offset * params?.page,
        name: params?.filterByName || null, // TODO not filtering as expected
        series: [params?.filterByWork],
        comics: [params?.filterByWork],
      },
    })
    .then(
      (response) => {
        const { data } = response.data;
        return data;
      },
      (error) => {
        return error;
      }
    );
};
