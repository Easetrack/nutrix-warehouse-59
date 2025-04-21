
import { useEffect, useState } from 'react';
import { 
  fetchWarehouses, 
  fetchZones, 
  fetchAreas, 
  fetchSubAreas,
  Location,
  Zone,
  Area,
  SubArea
} from '@/services/location';
import { 
  fetchCategories, 
  fetchTypes, 
  fetchSubTypes, 
  fetchUnits,
  Category,
  ProductType,
  SubType,
  UnitOfMeasure
} from '@/services/product';
import { useToast } from '@/hooks/use-toast';

export interface FilterOption {
  id: string;
  name: string;
  code?: string;
}

export const useFilterOptions = () => {
  const { toast } = useToast();
  
  // Location states
  const [warehouses, setWarehouses] = useState<FilterOption[]>([]);
  const [zones, setZones] = useState<FilterOption[]>([]);
  const [areas, setAreas] = useState<FilterOption[]>([]);
  const [subAreas, setSubAreas] = useState<FilterOption[]>([]);
  
  // Product states
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [types, setTypes] = useState<FilterOption[]>([]);
  const [subTypes, setSubTypes] = useState<FilterOption[]>([]);
  const [units, setUnits] = useState<FilterOption[]>([]);
  
  // Loading states
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const [isLoadingSubAreas, setIsLoadingSubAreas] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isLoadingSubTypes, setIsLoadingSubTypes] = useState(false);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);

  // Add "All" options to the beginning of each array
  const addAllOption = (options: FilterOption[], labelPrefix: string): FilterOption[] => {
    return [{ id: `All ${labelPrefix}s`, name: `All ${labelPrefix}s` }, ...options];
  };

  // Fetch warehouses
  const loadWarehouses = async () => {
    setIsLoadingWarehouses(true);
    try {
      const data = await fetchWarehouses();
      const formattedData = data.map(w => ({ 
        id: w.id, 
        name: w.name 
      }));
      setWarehouses(addAllOption(formattedData, 'Warehouse'));
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load warehouses. Please try again.",
      });
    } finally {
      setIsLoadingWarehouses(false);
    }
  };

  // Fetch zones
  const loadZones = async () => {
    setIsLoadingZones(true);
    try {
      const data = await fetchZones();
      const formattedData = data.map(z => ({ 
        id: z.code, 
        name: z.name,
        code: z.code
      }));
      setZones(addAllOption(formattedData, 'Zone'));
    } catch (error) {
      console.error('Error fetching zones:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load zones. Please try again.",
      });
    } finally {
      setIsLoadingZones(false);
    }
  };

  // Fetch areas based on selected zone
  const loadAreas = async (zoneCode: string) => {
    if (!zoneCode || zoneCode === 'All Zones') {
      setAreas(addAllOption([], 'Area'));
      setSubAreas(addAllOption([], 'SubArea'));
      return;
    }
    
    setIsLoadingAreas(true);
    try {
      const data = await fetchAreas(zoneCode);
      const formattedData = data.map(a => ({ 
        id: a.code, 
        name: a.name,
        code: a.code
      }));
      setAreas(addAllOption(formattedData, 'Area'));
      setSubAreas(addAllOption([], 'SubArea')); // Reset sub-areas when area changes
    } catch (error) {
      console.error('Error fetching areas:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load areas. Please try again.",
      });
    } finally {
      setIsLoadingAreas(false);
    }
  };

  // Fetch sub-areas based on selected zone and area
  const loadSubAreas = async (zoneCode: string, areaCode: string) => {
    if (!zoneCode || !areaCode || zoneCode === 'All Zones' || areaCode === 'All Areas') {
      setSubAreas(addAllOption([], 'SubArea'));
      return;
    }
    
    setIsLoadingSubAreas(true);
    try {
      const data = await fetchSubAreas(zoneCode, areaCode);
      const formattedData = data.map(sa => ({ 
        id: sa.code, 
        name: sa.name,
        code: sa.code
      }));
      setSubAreas(addAllOption(formattedData, 'SubArea'));
    } catch (error) {
      console.error('Error fetching sub-areas:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load sub-areas. Please try again.",
      });
    } finally {
      setIsLoadingSubAreas(false);
    }
  };

  // Fetch categories
  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const data = await fetchCategories();
      const formattedData = data.map(c => ({ 
        id: c.id, 
        name: c.name 
      }));
      setCategories(addAllOption(formattedData, 'Category'));
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load categories. Please try again.",
      });
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Fetch types based on selected category
  const loadTypes = async (categoryId: string) => {
    if (!categoryId || categoryId === 'All Categories') {
      setTypes(addAllOption([], 'Type'));
      setSubTypes(addAllOption([], 'SubType'));
      return;
    }
    
    setIsLoadingTypes(true);
    try {
      const data = await fetchTypes(categoryId);
      const formattedData = data.map(t => ({ 
        id: t.id, 
        name: t.name 
      }));
      setTypes(addAllOption(formattedData, 'Type'));
      setSubTypes(addAllOption([], 'SubType')); // Reset sub-types when type changes
    } catch (error) {
      console.error('Error fetching types:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load types. Please try again.",
      });
    } finally {
      setIsLoadingTypes(false);
    }
  };

  // Fetch sub-types based on selected type
  const loadSubTypes = async (typeId: string) => {
    if (!typeId || typeId === 'All Types') {
      setSubTypes(addAllOption([], 'SubType'));
      return;
    }
    
    setIsLoadingSubTypes(true);
    try {
      const data = await fetchSubTypes(typeId);
      const formattedData = data.map(st => ({ 
        id: st.id, 
        name: st.name 
      }));
      setSubTypes(addAllOption(formattedData, 'SubType'));
    } catch (error) {
      console.error('Error fetching sub-types:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load sub-types. Please try again.",
      });
    } finally {
      setIsLoadingSubTypes(false);
    }
  };

  // Fetch units based on selected category
  const loadUnits = async (categoryId: string) => {
    if (!categoryId || categoryId === 'All Categories') {
      setUnits(addAllOption([], 'UoM'));
      return;
    }
    
    setIsLoadingUnits(true);
    try {
      const data = await fetchUnits(categoryId);
      const formattedData = data.map(u => ({ 
        id: u.id, 
        name: u.name 
      }));
      setUnits(addAllOption(formattedData, 'UoM'));
    } catch (error) {
      console.error('Error fetching units:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load units. Please try again.",
      });
    } finally {
      setIsLoadingUnits(false);
    }
  };

  // Initial load of independent data
  useEffect(() => {
    loadWarehouses();
    loadZones();
    loadCategories();
  }, []);

  return {
    // Options
    warehouses,
    zones,
    areas,
    subAreas,
    categories,
    types,
    subTypes,
    units,
    
    // Loading states
    isLoadingWarehouses,
    isLoadingZones,
    isLoadingAreas,
    isLoadingSubAreas,
    isLoadingCategories,
    isLoadingTypes,
    isLoadingSubTypes,
    isLoadingUnits,
    
    // Loading functions
    loadAreas,
    loadSubAreas,
    loadTypes,
    loadSubTypes,
    loadUnits
  };
};
