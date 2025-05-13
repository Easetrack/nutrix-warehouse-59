import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebarNav from '@/components/newOrg/admin/AdminSidebarNav'; // สมมุติคุณมี sidebar
import { Toaster } from "@/components/ui/toaster";
import { AuthAdminProvider } from "@/modules/newOrg/admin/providers/AdminAuthProvider";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <AuthAdminProvider>
                <AdminSidebarNav >
                    <Outlet />
                </AdminSidebarNav>
            </AuthAdminProvider>

        </div>
    );
};

export default AdminLayout;
