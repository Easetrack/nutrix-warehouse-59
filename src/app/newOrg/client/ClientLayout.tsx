import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavProps from '@/components/newOrg/client/ClientSidebarNav'; // สมมุติคุณมี header
import { Toaster } from "@/components/ui/toaster";
import { AuthClientProvider } from "@/modules/newOrg/client/providers/ClientAuthProvider";

const ClientLayout = () => {
    return (
        <div className="min-h-screen">
            <AuthClientProvider>
                <SidebarNavProps >
                    <Outlet />
                </SidebarNavProps>
            </AuthClientProvider>
        </div>
    );
};

export default ClientLayout;
