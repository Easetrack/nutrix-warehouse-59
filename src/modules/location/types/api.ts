
export interface WarehouseResponse {
  id: string;
  name: string;
  isDefault?: boolean | null;
  address?: string;
  inventory?: number;
}

export interface ZoneResponse {
  id: string;
  name: string;
  code: string;
}

export interface AreaResponse {
  id: string;
  name: string;
  code: string;
  zoneCode: string;
}

export interface SubAreaResponse {
  id: string;
  name: string;
  code: string;
  areaCode: string;
}
