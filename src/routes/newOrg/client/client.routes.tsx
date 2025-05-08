import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientLayout from '@/app/newOrg/client/ClientLayout';
import ClientDashboard from "@/modules/newOrg/client/dashboard/Dashboard";

export const ClientRoutes = (
  <Route path="client" element={<ProtectedRoute><ClientLayout /></ProtectedRoute>}>
    <Route index element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
    <Route path="dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
    {/* เพิ่ม routes อื่น ๆ */}
  </Route>
);
