import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavProps from '@/components/newOrg/client/ClientSidebarNav'; // สมมุติคุณมี header
import { Toaster } from "@/components/ui/toaster";

const ClientLayout = () => {
    return (
        <div className="min-h-screen">
            <SidebarNavProps >
                <Outlet />
            </SidebarNavProps>
        </div>
    );
};

export default ClientLayout;
