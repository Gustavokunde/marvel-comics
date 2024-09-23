import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { User } from 'src/interfaces/user';
import { addUser, deleteUser, getUser, updateUser } from '../services/users';

type Context = {
  user: null | User;
  isLoading: boolean;
  isError: boolean;
  createProfile: UseMutationResult<any, Error, User, unknown>;
  updateProfile: UseMutationResult<any, Error, User, unknown>;
  deleteProfile: UseMutationResult<any, Error, string, unknown>;
};

const UserContext = createContext<Context | null>(null);

export const useProfile = () => useContext(UserContext) as Context;
interface Props {
  children: ReactNode;
}
export const UserProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();

  const {
    data: user = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const userId = sessionStorage.getItem('userId');
      const { data } = await getUser(userId);
      return data;
    },
    enabled: !!sessionStorage.getItem('userId'),
  });

  const addUserMutation = useMutation({
    mutationFn: async (newUser: User) => {
      const { data } = await addUser(newUser);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
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

  useEffect(() => {
    sessionStorage.setItem('userId', user.id);
  }, [user.id]);

  useEffect(() => {
    sessionStorage.setItem('userId', user.id);
  }, [user.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isError,
        createProfile: addUserMutation,
        updateProfile: updateUserMutation,
        deleteProfile: deleteUserMutation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
