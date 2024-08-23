import api from './api';

interface Params {
  filterByName?: string;
  filterByWork?: string;
}
export const getCharactersList = async (params?: Params) => {
  return await api
    .get('characters', {
      params: {
        limit: 19,
        offset: 20,
        name: params?.filterByName, // TODO not filtering as expected
        series: [params?.filterByWork],
        comics: [params?.filterByWork],
      },
    })
    .then(
      (response) => {
        return response.data.data.results;
      },
      (error) => {
        return error;
      }
    );
};
