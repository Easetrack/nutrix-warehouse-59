import apiClient from '@/services/api/api-client';

export interface Location {
  id: string;
  name: string;
  isDefault?: boolean | null;
  address?: string;
  inventory?: number;
}

export interface Zone {
  id: string;
  name: string;
  code: string;
}

export interface Area {
  id: string;
  name: string;
  code: string;
  zoneCode: string;
}

export interface SubArea {
  id: string;
  name: string;
  code: string;
  areaCode: string;
}

export const fetchWarehouses = async (): Promise<Location[]> => {
  const response = await apiClient.get('/Auth/GetLocation/all', {
    baseURL: 'https://webapiorg.easetrackwms.com/api'
  });
  return response.data;
};

export const fetchZones = async (stockCode: string): Promise<Zone[]> => {
  const response = await apiClient.get(`/Locations/zone/all?stockId=${stockCode}`);
  return response.data;
};

export const fetchAreas = async (zoneCode: string, stockCode: string): Promise<Area[]> => {
  if (!zoneCode || zoneCode === 'All Zones') return [];
  const response = await apiClient.get(`/Locations/area/all?zoneCode=${zoneCode}`);
  return response.data;
};

export const fetchSubAreas = async (zoneCode: string, areaCode: string, stockCode: string): Promise<SubArea[]> => {
  if (!zoneCode || !areaCode || zoneCode === 'All Zones' || areaCode === 'All Areas') return [];
  const response = await apiClient.get(`/Locations/subArea/all?zoneCode=${zoneCode}&areaCode=${areaCode}`);
  return response.data;
};
