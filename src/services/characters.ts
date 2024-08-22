import api from './api';

export const getCharactersList = async () => {
  return await api
    .get('characters', { params: { limit: 19, offset: 20 } })
    .then(
      (response) => {
        return response.data.data.results;
      },
      (error) => {
        return error;
      }
    );
};
