
import apiClient from './api-client';
import { StockResponse } from '@/types/stockupdate/summary';
import { StockUpdateQueryParams, StockUpdateLotQueryParams } from '@/types/stockupdate/api';

export const fetchStockUpdateSummary = async (params: StockUpdateQueryParams): Promise<StockResponse> => {
  // Build query params
  const queryParams = new URLSearchParams();
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  if (params.categoryId) {
    queryParams.append('categoryId', params.categoryId);
  }
  if (params.zoneId) {
    queryParams.append('zoneId', params.zoneId);
  }
  if (params.areaId) {
    queryParams.append('areaId', params.areaId);
  }
  if (params.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params.perPage) {
    queryParams.append('perPage', params.perPage.toString());
  }
  if (params.expiredDate) {
    queryParams.append('expiredDate', params.expiredDate);
  }

  const response = await apiClient.get(`/StockUpdate?${queryParams.toString()}`);
  return response.data;
};

export const fetchStockUpdateByLot = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  if (params.categoryId) {
    queryParams.append('categoryId', params.categoryId);
  }
  if (params.zoneId) {
    queryParams.append('zoneId', params.zoneId);
  }
  if (params.areaId) {
    queryParams.append('areaId', params.areaId);
  }
  if (params.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params.perPage) {
    queryParams.append('perPage', params.perPage.toString());
  }
  if (params.expiredDate) {
    queryParams.append('expiredDate', params.expiredDate);
  }

  const response = await apiClient.get(`/StockUpdate/byLot?${queryParams.toString()}`);
  return response.data;
};

export const fetchStockUpdateByLotBatch = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  if (params.categoryId) {
    queryParams.append('categoryId', params.categoryId);
  }
  if (params.zoneId) {
    queryParams.append('zoneId', params.zoneId);
  }
  if (params.areaId) {
    queryParams.append('areaId', params.areaId);
  }
  if (params.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params.perPage) {
    queryParams.append('perPage', params.perPage.toString());
  }
  if (params.expiredDate) {
    queryParams.append('expiredDate', params.expiredDate);
  }

  const response = await apiClient.get(`/StockUpdate/byLotBatch?${queryParams.toString()}`);
  return response.data;
};

