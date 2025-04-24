
import apiClient from "@/lib/api/client";

export const locationEndpoints = {
  warehouses: '/Auth/GetLocation/all',
  zones: (stockId: string) => `/Locations/zone/all?stockId=${stockId}`,
  areas: (zoneCode: string) => `/Locations/area/all?zoneCode=${zoneCode}`,
  subAreas: (zoneCode: string, areaCode: string) => `/Locations/subArea/all?zoneCode=${zoneCode}&areaCode=${areaCode}`
};

export const locationApiClient = apiClient;
