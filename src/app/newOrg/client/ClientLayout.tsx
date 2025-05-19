
import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebarNav from '@/modules/newOrg/client/sidebarClient/ClientSidebarNav';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/stores/auth/AuthContext";

const ClientLayout = () => {
    return (
        <div className="flex min-h-screen">
            <AuthProvider>
                <ClientSidebarNav>
                    <Outlet />
                </ClientSidebarNav>
            </AuthProvider>
        </div>
    );
};

export default ClientLayout;
