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
  createOrUpdateProfile: (user: User) => Promise<void>;
  deleteProfile: (id: string) => void;
  saveCharacter: (character: Character) => Promise<void>;
  hasError: boolean;
  clearHasError: () => void;
};

const UserContext = createContext<Context | null>(null);

export const useProfile = () => useContext(UserContext) as Context;
interface Props {
  children: ReactNode;
}
export const UserProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
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
    onError: () => {
      setHasError(true);
    },
  });

  const { mutateAsync: updateUserMutation } = useMutation({
    mutationFn: async (updatedUser: User) => {
      const { data } = await updateUser(updatedUser);
      setUser(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      setHasError(true);
    },
  });

  const createOrUpdateProfile = (user: User) => {
    return user.id ? updateUserMutation(user) : addUserMutation(user);
  };

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: async (id: string) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      setHasError(true);
    },
  });

  const { mutateAsync: saveCharacterInUserMutation } = useMutation({
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
    onError: () => {
      setHasError(true);
    },
  });

  useEffect(() => {
    if (user?.id) sessionStorage.setItem('userId', user.id);
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        hasError,
        clearHasError: () => setHasError(false),
        saveCharacter: (character: Character) =>
          saveCharacterInUserMutation(character),
        createOrUpdateProfile,
        deleteProfile: (id: string) => deleteUserMutation(id),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
