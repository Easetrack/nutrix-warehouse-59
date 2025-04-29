
import React, { useState, useEffect } from 'react';
import { Location } from '@/common/utils/auth';
import { useIsMobile } from '@/common/hooks/use-mobile';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

// Import our new components
import SidebarHeaderContent from './sidebar/SidebarHeader';
import WarehouseSelector from './sidebar/WarehouseSelector';
import SidebarMenuItems from './sidebar/SidebarMenuItems';
import SidebarUserFooter from './sidebar/SidebarFooter';

interface SidebarNavProps {
  children: React.ReactNode;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  const [isWarehouseMenuOpen, setIsWarehouseMenuOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Location | null>(null);

  // Load the selected warehouse from localStorage on component mount
  useEffect(() => {
    const storedWarehouse = localStorage.getItem('selectedWarehouse');
    if (storedWarehouse) {
      try {
        const parsedWarehouse = JSON.parse(storedWarehouse);
        setSelectedWarehouse(parsedWarehouse);
      } catch (error) {
        console.error('Error parsing stored warehouse:', error);
      }
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderContent />
            <div className="px-4 py-2">
              <WarehouseSelector
                selectedWarehouse={selectedWarehouse}
                isWarehouseMenuOpen={isWarehouseMenuOpen}
                setIsWarehouseMenuOpen={setIsWarehouseMenuOpen}
              />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenuItems />
          </SidebarContent>

          <SidebarFooter>
            <SidebarUserFooter />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          {/* Mobile sidebar trigger */}
          <div className="p-4 md:hidden">
            <SidebarTrigger />
          </div>
          
          {/* Desktop sidebar rail/trigger */}
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
          
          <div className="min-h-screen bg-background px-4 py-4 lg:px-8 lg:py-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarNav;
