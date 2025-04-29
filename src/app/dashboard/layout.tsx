
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';

const DashboardLayout: React.FC = () => {
  return (
    <SidebarNav>
      <Outlet />
    </SidebarNav>
  );
};

export default DashboardLayout;
