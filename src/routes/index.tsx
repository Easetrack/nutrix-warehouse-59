
import { Route } from "react-router-dom";
import { AdminRoutes } from './newOrg/admin/admin.routes';
import { ClientRoutes } from './newOrg/client/client.routes';
import Login from "@/pages/Login";
import SelectWarehouse from "@/pages/SelectWarehouse";
import NotFound from "@/pages/NotFound";

export const AppRoutes = (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/select-warehouse" element={<SelectWarehouse />} />
    
    {/* Organizational routes */}
    {AdminRoutes}
    {ClientRoutes}
    
    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </>
);
