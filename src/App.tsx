import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/lib/react-query'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CompanyProvider } from "./contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeCustomizer } from "./components/ui/theme-customizer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SelectWarehouse from "./pages/SelectWarehouse";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./app/dashboard/layout";

import { AuthProvider } from "@/stores/auth/AuthContext";

import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import StockUpdate from "./pages/StockUpdate";
// Permission subpages
import SummaryStockUpdate from "@/modules/stockUpdate/summary/SummaryStockUpdate";
import SummaryStockUpdateDetail from "./pages/stockUpdate/details/DetailsStockUpdate";
import SummaryStockUpdateDetailsLot from "./pages/stockUpdate/detailsLot/DetailsStockUpdateLot";
import SummaryStockUpdateDetailsLotBatch from "./pages/stockUpdate/detailsLotBatch/DetailsStockUpdateLotBatch";
// New pages
import Receiving from "./pages/Receiving";
import RequestPicking from "./pages/RequestPicking";
import CreatePicking from "./pages/requestPicking/CreatePicking";
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

// Role routes import
import RoleRoutes from "./pages/settings/permission/role/components/RoleRoutes";

import { useEffect } from "react";
import { useCompany } from "@/contexts/CompanyContext";

function App() {
  const { companyData } = useCompany();

  useEffect(() => {
    if (companyData?.logo) {
      let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

      if (!favicon) {
        favicon = document.createElement("link") as HTMLLinkElement;
        document.head.appendChild(favicon);
      }

      favicon.rel = "icon";
      favicon.type = "image/png";
      favicon.href = companyData.logo;
    }
  }, [companyData?.logo]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <CompanyProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Routes>
                {/* <Route path="/" element={<Index />} /> */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/select-warehouse" element={<SelectWarehouse />} />

                <Route >
                  <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/stock/summary" element={<ProtectedRoute><SummaryStockUpdate /></ProtectedRoute>} />
                    <Route path="/stock/detailsLot" element={
                      <ProtectedRoute>
                        <SummaryStockUpdateDetailsLot />
                      </ProtectedRoute>
                    } />

                    <Route path="/stock/detailsLotBatch" element={
                      <ProtectedRoute>
                        <SummaryStockUpdateDetailsLotBatch />
                      </ProtectedRoute>
                    } />
                    <Route path="/stock/summary" element={<ProtectedRoute><SummaryStockUpdate /></ProtectedRoute>} />
                    <Route path="/stock/details" element={<ProtectedRoute><SummaryStockUpdateDetail /></ProtectedRoute>} />
                    <Route path="/receiving" element={<ProtectedRoute><Receiving /></ProtectedRoute>} />
                    <Route path="/request-picking" element={<ProtectedRoute><RequestPicking /></ProtectedRoute>} />
                    <Route path="/request-picking/create" element={<ProtectedRoute><CreatePicking /></ProtectedRoute>} />
                    <Route path="/packing-ptw" element={<ProtectedRoute><PackingPTW /></ProtectedRoute>} />
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
                    <Route path="/settings/permission/users/*" element={
                      <ProtectedRoute>
                        <UsersPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings/permission/roles/*" element={
                      <ProtectedRoute>
                        <RoleRoutes />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings/permission/permissions" element={
                      <ProtectedRoute>
                        <PermissionsPage />
                      </ProtectedRoute>
                    } />
                  </Route>
                </Route>


                <Route path="*" element={<NotFound />} />
              </Routes>

              <ThemeCustomizer />
              <Toaster />
              <Sonner />
            </div>
          </CompanyProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
