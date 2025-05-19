
import { Route } from "react-router-dom";
import AdminLayout from "@/app/newOrg/admin/AdminLayout";
import Dashboard from "@/modules/newOrg/admin/dashboard/Dashboard";

export const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="setting" element={<div>Admin Settings</div>} />
    <Route path="manage-permission" element={<div>Manage Permissions</div>} />
    <Route index element={<Dashboard />} />
  </Route>
);
