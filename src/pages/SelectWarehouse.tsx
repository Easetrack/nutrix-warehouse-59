import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Warehouse } from "lucide-react";
import { WarehouseCard } from "@/components/warehouse/WarehouseCard";
import { useWarehouseSelection } from "@/hooks/useWarehouseSelection";
import { getAuthTokens } from "@/utils/auth";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>Select Warehouse</h1>
          <p className="mt-2 text-muted-foreground">
            Choose the warehouse you want to work with
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" 
              style={{ color: primaryColor }}
            />
            <Input
              placeholder="Search warehouses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

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
        ) : locations.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Warehouse className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">
              {searchTerm ? 'No matching warehouses' : 'No warehouses available'}
            </h3>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                refetch();
              }}
            >
              {searchTerm ? 'Clear Search' : 'Refresh'}
            </Button>
          </div>
        ) : (
          locations.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {locations.map((location) => (
                  <WarehouseCard
                    key={location.id}
                    location={location}
                    onClick={handleWarehouseClick}
                    isSelected={selectedWarehouse?.id === location.id}
                    primaryColor={primaryColor}
                  />
                ))}
              </div>

              <Button 
                variant="success" 
                size="lg"
                className="w-full max-w-md mx-auto block"
                disabled={!selectedWarehouse}
                onClick={handleContinue}
                style={{ 
                  backgroundColor: primaryColor, 
                  color: 'white',
                  opacity: selectedWarehouse ? 1 : 0.5
                }}
              >
                CONTINUE
              </Button>
            </>
          )
        )}

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            Log Out
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectWarehouse;
