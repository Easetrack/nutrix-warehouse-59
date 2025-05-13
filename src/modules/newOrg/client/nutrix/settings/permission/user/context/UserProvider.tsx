
import React, { useState, useEffect, ReactNode } from 'react';
import { User, Module } from '@/modules/settings/permission/types/types';
import { mockUsers, mockModules } from '@/modules/settings/permission/types/mockData';
import { useToast } from '@/common/hooks/use-toast';
import { useLanguage } from '@/stores/language/LanguageContext';
import UserContext from './UserContext';
import { createUserOperations } from './UserOperations';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setModules(mockModules);
      setLoading(false);
    }, 500);
  }, []);

  const userOperations = createUserOperations({
    users,
    setUsers,
    filteredUsers,
    setFilteredUsers,
    selectedUser,
    setSelectedUser,
    userToDelete,
    setUserToDelete,
    modules,
    toast,
    t
  });

  return (
    <UserContext.Provider value={{
      users,
      filteredUsers,
      modules,
      selectedUser,
      userToDelete,
      loading,
      ...userOperations,
      setSelectedUser,
      setUserToDelete
    }}>
      {children}
    </UserContext.Provider>
  );
};
