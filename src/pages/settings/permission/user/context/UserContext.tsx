
import { createContext, useContext } from 'react';
import { UserContextProps } from '@/pages/settings/permission/user/context/types/UserContextTypes';

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
