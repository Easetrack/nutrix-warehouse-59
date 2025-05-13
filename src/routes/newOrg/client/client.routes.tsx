import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientLayout from '@/app/newOrg/client/ClientLayout';
import ClientDashboard from "@/modules/newOrg/client/dashboard/Dashboard";

// import StockUpdate from "@/modules/stockUpdate";
import SummaryStockUpdate from "@/modules/newOrg/client/stockUpdate/summary/SummaryStockUpdate";
import SummaryStockUpdateDetailsLot from "@/modules/newOrg/client/stockUpdate/detailsLot/DetailsStockUpdateLot";
import SummaryStockUpdateDetailsLotBatch from "@/modules/newOrg/client/stockUpdate/detailsLotBatch/DetailsStockUpdateLotBatch";

// Settings subpages
import ProductSettings from "@/modules/newOrg/client/settings/product/pages/Product";
import LocationSettings from "@/modules/newOrg/client/settings/location/pages/Location";
import DepartmentSettings from "@/modules/newOrg/client/settings/Department";
import CustomerSettings from "@/modules/newOrg/client/settings/Customer";
import VendorSettings from "@/modules/newOrg/client/settings/Vendor";
import TransactionModelSettings from "@/modules/newOrg/client/settings/TransactionModel";
import LotModelSettings from "@/modules/newOrg/client/settings/LotModel";
import PermissionSettings from "@/modules/newOrg/client/settings/permission/DeleteConfirmationDialog";

// Permission subpages
import UsersPage from "@/modules/settings/permission/user/pages/UsersPage";
// import RolesPage from "@/modules/settings/permission/role/RolesPage";
import PermissionsPage from "@/modules/settings/permission/permission/PermissionsPage";

export const ClientRoutes = (
  <Route path="client" element={<ProtectedRoute><ClientLayout /></ProtectedRoute>}>
    <Route index element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
    <Route path="dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
    {/* เพิ่ม routes อื่น ๆ */}
    <Route path="stock/summary" element={<ProtectedRoute><SummaryStockUpdate /></ProtectedRoute>} />
    <Route path="stock/detailsLot" element={<ProtectedRoute><SummaryStockUpdateDetailsLot /></ProtectedRoute>} />
    <Route path="stock/detailsLotBatch" element={<ProtectedRoute><SummaryStockUpdateDetailsLotBatch /></ProtectedRoute>} />

    {/* เพิ่ม routes  setting*/}
    <Route path="settings/product" element={<ProtectedRoute><ProductSettings /></ProtectedRoute>} />
    <Route path="settings/location" element={<ProtectedRoute><LocationSettings /></ProtectedRoute>} />
    <Route path="settings/department" element={<ProtectedRoute><DepartmentSettings /></ProtectedRoute>} />
    <Route path="settings/customer" element={<ProtectedRoute><CustomerSettings /></ProtectedRoute>} />
    <Route path="settings/vendor" element={<ProtectedRoute><VendorSettings /></ProtectedRoute>} />
    <Route path="settings/transaction-model" element={<ProtectedRoute><TransactionModelSettings /></ProtectedRoute>} />
    <Route path="settings/lot-model" element={<ProtectedRoute><LotModelSettings /></ProtectedRoute>} />
    {/* <Route path="settings/permission" element={<ProtectedRoute><PermissionSettings /></ProtectedRoute>} /> */}
    <Route path="settings/permission/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
    {/* <Route path="settings/permission/roles" element={<ProtectedRoute><RoleRoutes /></ProtectedRoute>} /> */}
    <Route path="settings/permission/permissions" element={<ProtectedRoute><PermissionsPage /></ProtectedRoute>} />

    {/* เพิ่ม routes  stockUpdate*/}
  </Route>
);
