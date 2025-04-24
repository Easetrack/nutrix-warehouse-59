
import apiClient from "@/lib/api/client";
import { WarehouseType, ZoneType, AreaType, SubAreaType } from "../types";

export const fetchWarehouses = async (): Promise<WarehouseType[]> => {
  const response = await apiClient.get('/Auth/GetLocation/all', {
    baseURL: 'https://webapiorg.easetrackwms.com/api'
  });
  return response.data;
};

export const fetchZones = async (stockCode: string): Promise<ZoneType[]> => {
  const response = await apiClient.get(`/Locations/zone/all?stockId=${stockCode}`);
  return response.data;
};

export const fetchAreas = async (zoneCode: string, stockCode: string): Promise<AreaType[]> => {
  if (!zoneCode || zoneCode === 'All Zones') return [];
  const response = await apiClient.get(`/Locations/area/all?zoneCode=${zoneCode}`);
  return response.data;
};

export const fetchSubAreas = async (zoneCode: string, areaCode: string, stockCode: string): Promise<SubAreaType[]> => {
  if (!zoneCode || !areaCode || zoneCode === 'All Zones' || areaCode === 'All Areas') return [];
  const response = await apiClient.get(`/Locations/subArea/all?zoneCode=${zoneCode}&areaCode=${areaCode}`);
  return response.data;
};
