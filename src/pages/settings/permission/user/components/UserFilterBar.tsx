
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';

const UserFilterBar: React.FC = () => {
  const { handleSearch, handleRoleFilter, handleClear } = useUserContext();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const onSearch = () => {
    handleSearch(searchTerm);
  };

  const onRoleChange = (role: string) => {
    setSelectedRole(role);
    handleRoleFilter(role);
  };

  const onClear = () => {
    setSearchTerm('');
    setSelectedRole('');
    handleClear();
  };

  return (
    <div className="p-4 flex gap-2">
      <Select 
        value={selectedRole} 
        onValueChange={onRoleChange}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={t('permission.user.search.selectRole')} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">{t('permission.user.search.allRoles')}</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
          <SelectItem value="User">User</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex-grow relative">
        <Input 
          placeholder={t('permission.user
.search.placeholder')} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>
      
      <Button 
        variant="default" 
        onClick={onSearch}
      >
        <Search className="size-4 mr-1" /> {t('permission.user.search.placeholder')}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onClear}
      >
        {t('permission.user.clear')}
      </Button>
    </div>
  );
};

export default UserFilterBar;

