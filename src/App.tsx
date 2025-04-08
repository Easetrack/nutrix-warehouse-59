
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CompanyProvider } from "./contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectWarehouse from "./pages/SelectWarehouse";
import Dashboard from "./pages/Dashboard";
import StockUpdate from "./pages/StockUpdate";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// New pages
import Receiving from "./pages/Receiving";
import RequestPicking from "./pages/RequestPicking";
import PackingPTW from "./pages/PackingPTW";

// Settings subpages
import ProductSettings from "./pages/settings/Product";
import LocationSettings from "./pages/settings/Location";
import DepartmentSettings from "./pages/settings/Department";
import CustomerSettings from "./pages/settings/Customer";
import VendorSettings from "./pages/settings/Vendor";
import TransactionModelSettings from "./pages/settings/TransactionModel";
import LotModelSettings from "./pages/settings/LotModel";
import PermissionSettings from "./pages/settings/Permission";

// Permission subpages
import UsersPage from "./pages/settings/permission/user/UsersPage";
import RolesPage from "./pages/settings/permission/role/RolesPage";
import PermissionsPage from "./pages/settings/permission/permission/PermissionsPage";

import UserPermission from "./pages/settings/permission/user/UsersPage";
import RolePermission from "./pages/settings/permission/permission/PermissionsPage";
import PermissionPermission from "./pages/settings/permission/role/RolesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CompanyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/select-warehouse" element={<SelectWarehouse />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/stock" element={
                <ProtectedRoute>
                  <StockUpdate />
                </ProtectedRoute>
              } />
              
              {/* New Routes */}
              <Route path="/receiving" element={
                <ProtectedRoute>
                  <Receiving />
                </ProtectedRoute>
              } />
              <Route path="/request-picking" element={
                <ProtectedRoute>
                  <RequestPicking />
                </ProtectedRoute>
              } />
              <Route path="/packing-ptw" element={
                <ProtectedRoute>
                  <PackingPTW />
                </ProtectedRoute>
              } />
              
              {/* Settings Routes */}
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/settings/product" element={
                <ProtectedRoute>
                  <ProductSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/location" element={
                <ProtectedRoute>
                  <LocationSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/department" element={
                <ProtectedRoute>
                  <DepartmentSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/customer" element={
                <ProtectedRoute>
                  <CustomerSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/vendor" element={
                <ProtectedRoute>
                  <VendorSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/transaction-model" element={
                <ProtectedRoute>
                  <TransactionModelSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/lot-model" element={
                <ProtectedRoute>
                  <LotModelSettings />
                </ProtectedRoute>
              } />
              
              {/* Permission Routes */}
              <Route path="/settings/permission/*" element={
                <ProtectedRoute>
                  <PermissionSettings />
                </ProtectedRoute>
              } />
              <Route path="/settings/permission/users" element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              } />
              <Route path="/settings/permission/roles" element={
                <ProtectedRoute>
                  <RolesPage />
                </ProtectedRoute>
              } />
              <Route path="/settings/permission/permissions" element={
                <ProtectedRoute>
                  <PermissionsPage />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CompanyProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
