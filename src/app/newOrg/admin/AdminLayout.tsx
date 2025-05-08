import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebarNav from '@/components/newOrg/admin/AdminSidebarNav'; // สมมุติคุณมี sidebar
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebarNav >
                <Outlet />
            </AdminSidebarNav>
        </div>
    );
};

export default AdminLayout;
