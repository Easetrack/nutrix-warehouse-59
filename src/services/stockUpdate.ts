
import apiClient from './api-client';
import { StockResponse } from '@/types/stockupdate/summary';
import { StockUpdateQueryParams, StockUpdateLotQueryParams } from '@/types/stockupdate/api';

export const fetchStockUpdateSummary = async (params: StockUpdateQueryParams): Promise<StockResponse> => {
  // Build query params
  const queryParams = new URLSearchParams();
  
  // ส่งเฉพาะค่าที่มีและไม่ใช่ค่าว่างเท่านั้น
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  console.log('Query Params:', queryParams.toString()); // Debugging line

  const response = await apiClient.get(`/StockUpdate?${queryParams.toString()}`);
  return response.data;
};

export const fetchStockUpdateByLot = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  const queryParams = new URLSearchParams();
  
  // Add base parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Convert number values to string for URLSearchParams
      queryParams.append(key, String(value));
    }
  });

  const response = await apiClient.get(`/StockUpdate/byLot?${queryParams.toString()}`);
  return response.data;
};

export const fetchStockUpdateByLotBatch = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  const queryParams = new URLSearchParams();
  
  // Add base parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Convert number values to string for URLSearchParams
      queryParams.append(key, String(value));
    }
  });

  const response = await apiClient.get(`/StockUpdate/byLotBatch?${queryParams.toString()}`);
  return response.data;
};
