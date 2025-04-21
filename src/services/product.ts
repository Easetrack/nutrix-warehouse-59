
import apiClient from './api-client';

export interface Category {
  id: string;
  name: string;
}

export interface ProductType {
  id: string;
  name: string;
  categoryId: string;
}

export interface SubType {
  id: string;
  name: string;
  typeId: string;
}

export interface UnitOfMeasure {
  id: string;
  name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get('/Product/Categories/All');
  return response.data;
};

export const fetchTypes = async (categoryId: string): Promise<ProductType[]> => {
  if (!categoryId || categoryId === 'All Categories') return [];
  const response = await apiClient.get(`/Product/Types/All?CategoryId=${categoryId}`);
  return response.data;
};

export const fetchSubTypes = async (typeId: string): Promise<SubType[]> => {
  if (!typeId || typeId === 'All Types') return [];
  const response = await apiClient.get(`/Product/SubTypes/All?TypeId=${typeId}`);
  return response.data;
};

export const fetchUnits = async (categoryId: string): Promise<UnitOfMeasure[]> => {
  if (!categoryId || categoryId === 'All Categories') return [];
  const response = await apiClient.get(`/Product/${categoryId}/Unit`);
  return response.data;
};
