
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserEditPage from '@/modules/settings/permission/user/UserEditPage';
import UserDetailsPage from '@/modules/settings/permission/user/UserDetailsPage';
import { useUserContext } from '@/modules/settings/permission/user/context';
import UserListView from '@/modules/settings/permission/user/components/UserListView';

const UserRoutes: React.FC = () => {
  const { selectedUser, handleSaveUser } = useUserContext();

  return (
    <Routes>
      <Route path="/" element={<UserListView />} />
      <Route path="/new" element={
        <UserEditPage 
          onSave={handleSaveUser} 
          isNew={true} 
        />
      } />
      <Route path="/edit/:id" element={
        <UserEditPage 
          user={selectedUser!} 
          onSave={handleSaveUser}
        />
      } />
      <Route path="/details/:id" element={<UserDetailsPage />} />
    </Routes>
  );
};

export default UserRoutes;
