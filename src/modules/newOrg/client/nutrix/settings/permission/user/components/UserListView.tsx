
import React from 'react';
import { useUserContext } from '@/modules/settings/permission/user/context';
import UserHeader from '@/modules/settings/permission/user/components/UserHeader';
import UserFilterBar from '@/modules/settings/permission/user/components/UserFilterBar';
import UserListTable from '@/modules/settings/permission/user/UserListTable';
import UserDialogs from '@/modules/settings/permission/user/components/UserDialogs';

const UserListView: React.FC = () => {
  const { 
    filteredUsers, 
    handleViewUser, 
    handleEditUser, 
    handleDeleteUser 
  } = useUserContext();

  return (
    <div className="">
      <UserHeader />
      
      <div className="rounded-md border bg-white">
        <UserFilterBar />
        
        <UserListTable 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </div>
      
      <UserDialogs />
    </div>
  );
};

export default UserListView;
