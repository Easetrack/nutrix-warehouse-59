import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Warehouse, Search } from "lucide-react";
import { Location, fetchLocations, logout, getAuthTokens } from "@/utils/auth";
import apiClient from "@/services/api-client";
import { useQuery } from '@tanstack/react-query';

const SelectWarehouse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentWarehouses, setRecentWarehouses] = useState<Location[]>([]);

  const {
    data: locations = [],
    isLoading,
    error: fetchError,
    refetch
  } = useQuery<Location[], Error>({
    queryKey: ['warehouseLocations'],
    queryFn: fetchLocations,
    select: (data) => data.filter(loc => loc.id !== ""),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const tokens = getAuthTokens();
      if (!tokens) {
        navigate('/login');
      }
    };
    checkAuth();

    const lastSelected = localStorage.getItem('lastSelectedWarehouse');
    if (lastSelected) {
      setRecentWarehouses([JSON.parse(lastSelected)]);
    }
  }, [navigate]);

  useEffect(() => {
    if (fetchError) {
      toast({
        title: "Error",
        description: fetchError.message || "Failed to load warehouse locations",
        variant: "destructive",
      });
    }
  }, [fetchError, toast]);

  const handleSelectWarehouse = (location: Location) => {
    if (!location.id) {
      toast({
        title: "Invalid Selection",
        description: "Please select a valid warehouse",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('selectedWarehouse', JSON.stringify(location));
    localStorage.setItem('currentWarehouseId', location.id);
    localStorage.setItem('currentWarehouseName', location.name);
    localStorage.setItem('lastSelectedWarehouse', JSON.stringify(location));

    apiClient.defaults.headers['x-location'] = location.id;

    toast({
      title: "Warehouse Selected",
      description: `You have selected ${location.name}`,
    });

    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Select Warehouse</h1>
          <p className="mt-2 text-gray-600">
            Choose the warehouse you want to work with
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search warehouses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {recentWarehouses.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-medium">Recently Used</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {recentWarehouses.map((location) => (
                <Card key={`recent-${location.id}`} className="overflow-hidden border-primary">
                  {/* ... same card content ... */}
                </Card>
              ))}
            </div>
          </div>
        )}

        <h2 className="mb-3 text-lg font-medium">
          {recentWarehouses.length > 0 ? 'All Warehouses' : 'Available Warehouses'}
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-10 w-10 rounded-full mr-3" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="bg-background p-4">
                    <Skeleton className="h-9 w-full rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredLocations.length === 0 ? (
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredLocations.map((location) => (
              <Card
                key={location.id}
                className="overflow-hidden transition-all hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="mb-4 flex items-center">
                      <div className="mr-3 rounded-full bg-primary/10 p-2">
                        <Warehouse className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      ID: {location.id}
                    </p>
                  </div>
                  <div className="bg-background p-4">
                    <Button
                      className="w-full"
                      onClick={() => handleSelectWarehouse(location)}
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectWarehouse;