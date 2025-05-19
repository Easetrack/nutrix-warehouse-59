
import { Route } from "react-router-dom";
import ProductSettings from "@/modules/settings/product/pages/Product";
import LocationSettings from "@/modules/settings/location/pages/Location";
import UserRoutes from "@/modules/settings/permission/user/components/UserRoutes";
import RoleRoutes from "@/modules/settings/permission/role/components/RoleRoutes";
import PermissionsPage from "@/modules/settings/permission/permission/PermissionsPage";

export const SettingsRoutes = (
  <Route path="settings">
    <Route path="product" element={<ProductSettings />} />
    <Route path="location" element={<LocationSettings />} />
    <Route path="department" element={<div>Department Settings</div>} />
    <Route path="customer" element={<div>Customer Settings</div>} />
    <Route path="vendor" element={<div>Vendor Settings</div>} />
    <Route path="transaction-model" element={<div>Transaction Model Settings</div>} />
    <Route path="lot-model" element={<div>Lot Model Settings</div>} />
    
    {/* Permission settings routes */}
    <Route path="permission/user/*" element={<UserRoutes />} />
    <Route path="permission/role/*" element={<RoleRoutes />} />
    <Route path="permission/permission" element={<PermissionsPage />} />
    
    <Route index element={<ProductSettings />} />
  </Route>
);
