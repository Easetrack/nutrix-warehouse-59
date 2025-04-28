
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CompanyProvider } from "./contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeCustomizer } from "./components/ui/theme-customizer";

// New app layouts
import RootLayout from "./app/layout";
import DashboardLayout from "./app/dashboard/layout";
import SettingsLayout from "./app/settings/layout";

// Pages
import LoginPage from "./app/login/page";
import RoleRoutes from "@/modules/settings/permission/role/components/RoleRoutes";

// Lazy loaded pages to improve performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SelectWarehouse = lazy(() => import("./pages/SelectWarehouse"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const StockUpdate = lazy(() => import("./pages/stockUpdate/StockUpdate"));
const SummaryStockPage = lazy(() => import("./pages/stockUpdate/summary/summary.page"));
const SummaryStockUpdateDetail = lazy(() => import("./modules/stockUpdate/details/DetailsStockUpdate"));
const Receiving = lazy(() => import("./pages/Receiving"));
const RequestPicking = lazy(() => import("./pages/requestPicking/RequestPicking"));
const PackingPTW = lazy(() => import("./pages/PackingPTW"));
const ProductSettings = lazy(() => import("./modules/settings/product/pages/Product"));
const LocationSettings = lazy(() => import("./modules/settings/location/pages/Location"));
const DepartmentSettings = lazy(() => import("./pages/settings/Settings"));
const CustomerSettings = lazy(() => import("./modules/settings/Customer"));
const VendorSettings = lazy(() => import("./modules/settings/Vendor"));
const TransactionModelSettings = lazy(() => import("./modules/settings/TransactionModel"));
const LotModelSettings = lazy(() => import("./modules/settings/LotModel"));
const PermissionSettings = lazy(() => import("./modules/settings/permission/pagesHide/Permission"));
const UsersPage = lazy(() => import("./modules/settings/permission/user/pages/UsersPage"));
const RolesPage = lazy(() => import("./modules/settings/permission/role/RolesPage"));
const PermissionsPage = lazy(() => import("./modules/settings/permission/permission/PermissionsPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CompanyProvider>
          <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <Routes>
              {/* Root layout that wraps all pages */}
              <Route element={<RootLayout />}>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/select-warehouse" element={<SelectWarehouse />} />

                {/* Dashboard routes with dashboard layout */}
                {/* <Route element={<ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>}>
                
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
                  <Route path="/stock/summary" element={
                    <ProtectedRoute>
                      <SummaryStockPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/stock/details" element={
                    <ProtectedRoute>
                      <SummaryStockUpdateDetail />
                    </ProtectedRoute>
                  } />

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
                </Route> */}

                {/* Settings routes with settings layout */}
                {/* <Route element={<SettingsLayout />}>
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

                  <Route path="/settings/permission/*" element={
                    <ProtectedRoute>
                      <PermissionSettings />
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
                </Route> */}

                {/* Protected routes with dashboard layout */}
                <Route element={<ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>}>
                  <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/stock" element={<StockUpdate />} />
                    <Route path="/stock/summary" element={<SummaryStockPage />} />
                    <Route path="/stock/details" element={<SummaryStockUpdateDetail />} />
                    <Route path="/receiving" element={<Receiving />} />
                    <Route path="/request-picking" element={<RequestPicking />} />
                    <Route path="/packing-ptw" element={<PackingPTW />} />
                  </Route>
                </Route>

                {/* Fallback for 404 pages */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>

            <ThemeCustomizer />
            <Toaster />
            <Sonner />
          </Suspense>
        </CompanyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
