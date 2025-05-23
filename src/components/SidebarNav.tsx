
import React, { useState, useEffect } from 'react';
import { Location } from '@/common/utils/auth';
import { useIsMobile } from '@/common/hooks/use-mobile';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

// Import our components
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
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="floating" collapsible={isMobile ? "offcanvas" : "icon"}>
          <SidebarHeader>
            <SidebarHeaderContent />
            
            {/* Wrap the WarehouseSelector in a div only when not collapsed */}
            <WarehouseSelector
              selectedWarehouse={selectedWarehouse}
              isWarehouseMenuOpen={isWarehouseMenuOpen}
              setIsWarehouseMenuOpen={setIsWarehouseMenuOpen}
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenuItems />
          </SidebarContent>

          <SidebarFooter>
            <SidebarUserFooter />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="min-h-screen bg-background px-4 py-4 lg:px-8 lg:py-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarNav;
