
import { locationApiClient, locationEndpoints } from './config';
import { WarehouseResponse, ZoneResponse, AreaResponse, SubAreaResponse } from '../types/api';

export const fetchWarehouses = async (): Promise<WarehouseResponse[]> => {
  const response = await locationApiClient.get(locationEndpoints.warehouses, {
    baseURL: 'https://webapiorg.easetrackwms.com/api'
  });
  return response.data;
};

export const fetchZones = async (stockCode: string): Promise<ZoneResponse[]> => {
  const response = await locationApiClient.get(locationEndpoints.zones(stockCode));
  return response.data;
};

export const fetchAreas = async (zoneCode: string, stockCode: string): Promise<AreaResponse[]> => {
  if (!zoneCode || zoneCode === 'All Zones') return [];
  const response = await locationApiClient.get(locationEndpoints.areas(zoneCode));
  return response.data;
};

export const fetchSubAreas = async (
  zoneCode: string,
  areaCode: string,
  stockCode: string
): Promise<SubAreaResponse[]> => {
  if (!zoneCode || !areaCode || zoneCode === 'All Zones' || areaCode === 'All Areas') return [];
  const response = await locationApiClient.get(locationEndpoints.subAreas(zoneCode, areaCode));
  return response.data;
};
