
import apiClient from './api-client';
import { StockResponse } from '@/types/stockupdate/summary';
import { StockUpdateQueryParams, StockUpdateLotQueryParams } from '@/types/stockupdate/api';

/**
 * Fetches stock update summary data with the given query parameters
 */
export const fetchStockUpdateSummary = async (params: StockUpdateQueryParams): Promise<StockResponse> => {
  try {
    // Build query params - only include non-empty values
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    console.log('Query Params:', queryParams.toString());

    // Make API request
    const response = await apiClient.get(`/StockUpdate?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock update summary:', error);
    
    // Return empty response structure on error
    return {
      items: [],
      totalPages: 1,
      totalCount: 0,
      perPage: 10,
      page: params.page || 1
    };
  }
};

/**
 * Fetches stock update data by lot with the given query parameters
 */
export const fetchStockUpdateByLot = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  try {
    // Build query params
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    // Make API request
    const response = await apiClient.get(`/StockUpdate/byLot?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock update by lot:', error);
    
    // Return empty response structure on error
    return {
      items: [],
      totalPages: 1,
      totalCount: 0,
      perPage: 10,
      page: params.page || 1
    };
  }
};

/**
 * Fetches stock update data by lot batch with the given query parameters
 */
export const fetchStockUpdateByLotBatch = async (params: StockUpdateLotQueryParams): Promise<StockResponse> => {
  try {
    // Build query params
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    // Make API request
    const response = await apiClient.get(`/StockUpdate/byLotBatch?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock update by lot batch:', error);
    
    // Return empty response structure on error
    return {
      items: [],
      totalPages: 1,
      totalCount: 0,
      perPage: 10,
      page: params.page || 1
    };
  }
};
