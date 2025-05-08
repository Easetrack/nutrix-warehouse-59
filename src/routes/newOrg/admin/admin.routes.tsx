import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from '@/app/newOrg/admin/AdminLayout';
import AdminDashboard from "@/modules/newOrg/admin/dashboard/Dashboard";

export const AdminRoutes = (
  <Route path="admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
    <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    {/* เพิ่ม routes อื่น ๆ */}
  </Route>
);
