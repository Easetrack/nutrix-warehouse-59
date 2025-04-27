
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/stores/theme/ThemeContext";
import { getAuthTokens } from "@/common/utils/auth";
import { useWarehouseSelection } from "@/common/hooks/useWarehouseSelection";
import { WarehouseHeader } from "@/components/warehouse/WarehouseHeader";
import { WarehouseSearch } from "@/components/warehouse/WarehouseSearch";
import { WarehouseList } from "@/components/warehouse/WarehouseList";
import { WarehouseActions } from "@/components/warehouse/WarehouseActions";

const SelectWarehouse = () => {
  const navigate = useNavigate();
  const { primaryColor } = useTheme();
  const {
    searchTerm,
    setSearchTerm,
    locations,
    isLoading,
    handleSelectWarehouse,
    handleLogout,
    refetch,
    selectedWarehouse,
    setSelectedWarehouse
  } = useWarehouseSelection();

  useEffect(() => {
    const checkAuth = async () => {
      const tokens = getAuthTokens();
      if (!tokens) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleWarehouseClick = (location) => {
    setSelectedWarehouse(location);
  };

  const handleContinue = () => {
    if (selectedWarehouse) {
      handleSelectWarehouse(selectedWarehouse);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        <WarehouseHeader primaryColor={primaryColor} />
        
        <WarehouseSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          primaryColor={primaryColor}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-4 w-4" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <WarehouseList
              isLoading={isLoading}
              locations={locations}
              selectedWarehouse={selectedWarehouse}
              handleWarehouseClick={handleWarehouseClick}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              refetch={refetch}
              primaryColor={primaryColor}
            />

            <WarehouseActions
              selectedWarehouse={selectedWarehouse}
              handleContinue={handleContinue}
              handleLogout={handleLogout}
              primaryColor={primaryColor}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SelectWarehouse;
