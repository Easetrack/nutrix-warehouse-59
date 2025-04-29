
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useUser } from '@/common/hooks/use-user';
import { useLanguage } from '@/stores/language/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';

const SidebarUserFooter: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: user, isLoading } = useUser();

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('selectedWarehouse');
    navigate('/login');
  };

  const getAvatarFallback = () => {
    if (!user) return '';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <>
      <ThemeToggle />
      <div className="border-t border-muted p-4">
        {isLoading ? (
          <div className="flex items-center gap-3 px-3 mb-3 animate-pulse">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
            </Avatar>
            <div className="text-sm leading-tight">
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-muted-foreground text-xs">@{user?.username}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-muted transition"
        >
          <LogOut size={18} className="text-destructive" />
          <span>{t('action.signOut')}</span>
        </button>
      </div>
    </>
  );
};

export default SidebarUserFooter;
