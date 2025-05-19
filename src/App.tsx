
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/lib/react-query';
import { BrowserRouter, Routes } from "react-router-dom";
import { CompanyProvider } from "./contexts/CompanyContext";
import { ThemeCustomizer } from "./components/ui/theme-customizer";
import { AuthProvider } from "@/stores/auth/AuthContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <CompanyProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Routes>
                {AppRoutes}
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
