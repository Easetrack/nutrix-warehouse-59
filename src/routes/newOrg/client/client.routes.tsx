
import { Route } from "react-router-dom";
import ClientLayout from "@/app/newOrg/client/ClientLayout";
import Dashboard from "@/modules/newOrg/client/dashboard/Dashboard";
import { StockRoutes } from "./stock.routes";
import { SettingsRoutes } from "./settings.routes";

export const ClientRoutes = (
  <Route path="/client" element={<ClientLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    
    {/* Stock module routes */}
    {StockRoutes}
    
    {/* Settings module routes */}
    {SettingsRoutes}
    
    <Route index element={<Dashboard />} />
  </Route>
);
