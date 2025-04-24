
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from "@/contexts/LanguageContext";
interface RoleHeaderProps {
  onAddRole: () => void;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ onAddRole }) => {
  const { t } = useLanguage();
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('permission.roles')}</h1>
        <p className="text-muted-foreground">{t('permission.rolesDescription')}</p>
      </div>
      <Button 
        onClick={onAddRole}
        className="gap-1 bg-primary"
      >
        <Plus className="size-4" /> {t('permission.addRole')}
      </Button>
    </div>
  );
};

export default RoleHeader;
