import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Character } from 'src/interfaces/character';
import { User } from 'src/interfaces/user';
import {
  addUser,
  deleteUser,
  getUser,
  updateCharactersInUser,
  updateUser,
} from '../services/users';

type Context = {
  user: null | User;
  createProfile: (user: User) => Promise<void>;
  updateProfile: (user: User) => void;
  deleteProfile: (id: string) => void;
  saveCharacter: (character: Character) => void;
};

const UserContext = createContext<Context | null>(null);

export const useProfile = () => useContext(UserContext) as Context;
interface Props {
  children: ReactNode;
}
export const UserProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);

  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const userId = sessionStorage.getItem('userId');
      const { data } = await getUser(userId);
      setUser(data);
      return data;
    },
    enabled: !!sessionStorage.getItem('userId'),
  });

  const { mutateAsync: addUserMutation } = useMutation({
    mutationFn: async (newUser: User) => {
      const { data } = await addUser(newUser);
      setUser(data);
      return data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      const { data } = await updateUser(updatedUser);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const saveCharacterInUserMutation = useMutation({
    mutationFn: async (character: Character) => {
      const userCharacters = [...(user?.characters || [])];
      if (!user?.id) return;
      const existentIndexCharacter = userCharacters?.findIndex(
        ({ id }) => id == character.id
      );

      if (existentIndexCharacter !== -1 && userCharacters) {
        userCharacters.splice(existentIndexCharacter, 1);
      } else {
        userCharacters?.push(character);
      }

      const { data } = await updateCharactersInUser(user.id, userCharacters);
      setUser(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  useEffect(() => {
    if (user?.id) sessionStorage.setItem('userId', user.id);
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        saveCharacter: (character: Character) =>
          saveCharacterInUserMutation.mutate(character),
        createProfile: (user: User) => addUserMutation(user),
        updateProfile: (user: User) => updateUserMutation.mutate(user),
        deleteProfile: (id: string) => deleteUserMutation.mutate(id),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
