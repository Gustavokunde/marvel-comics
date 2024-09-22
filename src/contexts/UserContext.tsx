import { createContext, useEffect, useState } from 'react';
import { User } from 'src/interfaces/user';
import { addUser, deleteUser, getUser, updateUser } from '../services/users';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(user.id).then((response) => setUser(response.data));
  }, []);

  const createProfile = () => {
    if (user) addUser(user);
  };

  const updateProfile = () => {
    if (user) updateUser(user.id, user);
  };

  const deleteProfile = () => {
    if (user?.id) deleteUser(user.id);
  };

  return (
    <UserContext.Provider
      value={{ user, createProfile, updateProfile, deleteProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
