
import apiClient from './api-client';
import { StockResponse } from '@/types/stockupdate/summary';
import { StockUpdateQueryParams, StockUpdateLotQueryParams } from '@/types/stockupdate/api';

export const fetchStockUpdateSummary = async (params: StockUpdateQueryParams): Promise<StockResponse> => {
  const response = await apiClient.get('/StockUpdate', { params });
  return response.data;
};

export const fetchStockUpdateByLot = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  const response = await apiClient.get('/StockUpdate/byLot', { params });
  return response.data;
};

export const fetchStockUpdateByLotBatch = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  const response = await apiClient.get('/StockUpdate/byLotBatch', { params });
  return response.data;
};
