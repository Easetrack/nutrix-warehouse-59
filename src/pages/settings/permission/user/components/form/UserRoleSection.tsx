
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { UserFormData } from '@/modules/settings/permission/types/types';

interface UserRoleSectionProps {
  form: UseFormReturn<UserFormData>;
}

const UserRoleSection: React.FC<UserRoleSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            The role determines what permissions the user will have in the system
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UserRoleSection;
