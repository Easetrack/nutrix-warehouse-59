
import { useEffect, useState } from 'react';
import {
  fetchCategories,
  fetchTypes,
  fetchSubTypes,
  fetchUnits,
} from '@/services/srp/product/product';
import { useToast } from "@/common/hooks/use-toast";
import type { FilterOption } from "@/common/types/filterOptions";

export const useProductOptions = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [types, setTypes] = useState<FilterOption[]>([]);
  const [subTypes, setSubTypes] = useState<FilterOption[]>([]);
  const [units, setUnits] = useState<FilterOption[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isLoadingSubTypes, setIsLoadingSubTypes] = useState(false);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);

  const addAllOption = (options: FilterOption[], labelPrefix: string): FilterOption[] => {
    return [{ id: `All ${labelPrefix}s`, name: `All ${labelPrefix}s` }, ...options];
  };

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const data = await fetchCategories();
      const formatted = data.map(c => ({ id: c.id, name: c.name }));
      setCategories(addAllOption(formatted, 'Category'));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load categories. Please try again.",
      });
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const loadTypes = async (categoryId: string) => {
    if (!categoryId || categoryId === 'All Categories') {
      setTypes(addAllOption([], 'Type'));
      setSubTypes(addAllOption([], 'SubType'));
      return;
    }
    setIsLoadingTypes(true);
    try {
      const data = await fetchTypes(categoryId);
      const formatted = data.map(t => ({ id: t.id, name: t.name }));
      setTypes(addAllOption(formatted, 'Type'));
      setSubTypes(addAllOption([], 'SubType'));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load types. Please try again.",
      });
    } finally {
      setIsLoadingTypes(false);
    }
  };

  const loadSubTypes = async (typeId: string) => {
    if (!typeId || typeId === 'All Types') {
      setSubTypes(addAllOption([], 'SubType'));
      return;
    }
    setIsLoadingSubTypes(true);
    try {
      const data = await fetchSubTypes(typeId);
      const formatted = data.map(st => ({ id: st.id, name: st.name }));
      setSubTypes(addAllOption(formatted, 'SubType'));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load sub-types. Please try again.",
      });
    } finally {
      setIsLoadingSubTypes(false);
    }
  };

  const loadUnits = async (categoryId: string) => {
    if (!categoryId || categoryId === 'All Categories') {
      setUnits(addAllOption([], 'UoM'));
      return;
    }
    setIsLoadingUnits(true);
    try {
      const data = await fetchUnits(categoryId);
      const formatted = data.map(u => ({ id: u.id, name: u.name }));
      setUnits(addAllOption(formatted, 'UoM'));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load units. Please try again.",
      });
    } finally {
      setIsLoadingUnits(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories, types, subTypes, units,
    isLoadingCategories, isLoadingTypes, isLoadingSubTypes, isLoadingUnits,
    loadTypes, loadSubTypes, loadUnits,
  };
};
