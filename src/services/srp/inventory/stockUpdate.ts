
import apiClient from '@/services/api/api-client';
import { StockResponse } from '@/common/types/stockupdate/summary';
import { StockLotResponse } from '@/common/types/stockupdate/lot';
import { StockUpdateQueryParams, StockUpdateLotQueryParams } from '@/common/types/stockupdate/api';

import { format } from 'date-fns';

/**
 * Builds query params from the parameters object
 * @param params Object containing filter values
 * @returns URLSearchParams object
 */
const buildQueryParams = (params: Record<string, unknown>): URLSearchParams => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Handle Date objects by formatting them to strings
      if (value instanceof Date) {
        queryParams.append(key, format(value, 'MM-dd-yyyy'));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  return queryParams;
};

/**
 * Fetches stock update summary data with the given query parameters
 */
export const fetchStockUpdateSummary = async (params: StockUpdateQueryParams): Promise<StockResponse> => {
  try {
    // Build query params - only include non-empty values
    const queryParams = buildQueryParams(params);

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
export const fetchStockUpdateByLot = async (params: StockUpdateLotQueryParams): Promise<StockLotResponse> => {
  try {
    // Build query params
    const queryParams = buildQueryParams(params);

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
    const queryParams = buildQueryParams(params);

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
