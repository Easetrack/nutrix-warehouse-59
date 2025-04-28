
import React from 'react';
import { Form } from '@/components/ui/form';
import { UserFormData } from '@/modules/settings/permission/types/types';
import { UseFormReturn } from 'react-hook-form';
import UserFormAvatar from '@/modules/settings/permission/user/components/UserFormAvatar';
import UserFormBasicInfo from '@/modules/settings/permission/user/components/UserFormBasicInfo';
import UserFormCredentials from '@/modules/settings/permission/user/components/UserFormCredentials';
import UserFormJobInfo from '@/modules/settings/permission/user/components/UserFormJobInfo';
import UserFormMetadata from '@/modules/settings/permission/user/components/UserFormMetadata';

interface UserFormContentProps {
  form: UseFormReturn<UserFormData>;
  onSubmit: (data: UserFormData) => void;
}

const UserFormContent: React.FC<UserFormContentProps> = ({
  form,
  onSubmit
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UserFormAvatar form={form} />
        
        <div className="grid grid-cols-2 gap-4">
          <UserFormBasicInfo form={form} />
          <UserFormCredentials form={form} />
          <UserFormJobInfo form={form} />
          <UserFormMetadata form={form} />
        </div>
      </form>
    </Form>
  );
};

export default UserFormContent;
