
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
  
  // Always ensure page and perPage are included
  queryParams.append('page', String(params.page || 1));
  queryParams.append('perPage', String(params.perPage || 10));
  
  // Add all other parameters
  Object.entries(params).forEach(([key, value]) => {
    // Skip page/perPage (already handled)
    if (key === 'page' || key === 'perPage') {
      return;
    }
    
    if (value !== undefined && value !== null && value !== '') {
      // Skip "All Categories", "All Warehouses", etc.
      if (value === "All Categories" || 
          value === "All Warehouses" || 
          value === "All Zones" || 
          value === "All Areas" || 
          value === "All SubAreas" || 
          value === "All UoM") {
        return;
      }
      
      // Handle Date objects
      if (value instanceof Date) {
        queryParams.append(key, format(value, 'MM-dd-yyyy'));
      } 
      // Skip arrays or objects
      else if (typeof value !== 'object') {
        queryParams.append(key, String(value));
      }
    }
  });
  
  console.log("Final API query params:", queryParams.toString());
  return queryParams;
};

/**
 * Fetches stock update summary data with the given query parameters
 */
export const fetchStockUpdateSummary = async (params: StockUpdateQueryParams): Promise<StockResponse> => {
  try {
    // Build query params - only include non-empty values
    const queryParams = buildQueryParams(params);
    
    console.log("Calling Stock Update API with:", queryParams.toString());

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
