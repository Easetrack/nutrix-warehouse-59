
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Location, fetchLocations, logout } from "@/utils/auth";
import apiClient from "@/services/api-client";
import { useQuery } from '@tanstack/react-query';

export const useWarehouseSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<Location | null>(null);
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

  return {
    searchTerm,
    setSearchTerm,
    recentWarehouses,
    setRecentWarehouses,
    locations: filteredLocations,
    isLoading,
    handleSelectWarehouse,
    handleLogout,
    refetch,
    selectedWarehouse,
    setSelectedWarehouse
  };
};
