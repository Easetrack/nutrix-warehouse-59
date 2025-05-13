
import React, { useState } from 'react';
import DeleteConfirmationDialog from '@/modules/settings/permission/components/DeleteConfirmationDialog';
import { useUserContext } from '@/modules/settings/permission/user/context';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/stores/language/LanguageContext';

const UserDialogs: React.FC = () => {
  const { 
    userToDelete, 
    confirmDeleteUser,
    setUserToDelete
  } = useUserContext();
  const { t } = useLanguage();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  React.useEffect(() => {
    if (userToDelete && !deleteDialogOpen) {
      setDeleteDialogOpen(true);
    }
  }, [userToDelete, deleteDialogOpen]);

  return (
    <>
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setUserToDelete(null);
        }}
        onConfirm={confirmDeleteUser}
        title={t('permission.deleteUser')}
        description={t('permission.deleteUserConfirmation')}
      />
    </>
  );
};

export default UserDialogs;
