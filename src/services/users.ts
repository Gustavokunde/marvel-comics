import { Character } from 'src/interfaces/character';
import { User } from '../interfaces/user';
import { userApi as api } from './api';

export const addUser = async (user: User) => {
  return await api.post('/', user);
};

export const updateUser = async (updatedUser: User) => {
  return await api.put(`/${updatedUser.id}`, updatedUser);
};

export const updateCharactersInUser = async (
  userId: string,
  characters: Array<Character>
) => {
  return await api.patch(`/${userId}`, { characters });
};

export const getUser = async (id: string | null) => {
  return await api.get(`/${id}`);
};

export const deleteUser = async (id: string) => {
  return await api.delete(`/${id}`);
};
