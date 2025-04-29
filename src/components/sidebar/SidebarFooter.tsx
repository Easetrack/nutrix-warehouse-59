
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useUser } from '@/common/hooks/use-user';
import { useLanguage } from '@/stores/language/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center justify-center gap-2 mb-2">
        <ThemeToggle />
      </div>
      
      <div className="rounded-lg bg-sidebar-accent/40 p-3">
        {isLoading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getAvatarFallback() || <User size={16} />}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm leading-tight">
                <p className="font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-muted-foreground text-xs">@{user?.username}</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10 rounded-md bg-transparent"
            >
              <LogOut size={16} />
              <span>{t('action.signOut')}</span>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default SidebarUserFooter;
