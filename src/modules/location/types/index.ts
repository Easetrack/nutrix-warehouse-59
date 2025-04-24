
export interface LocationType {
  id: string;
  name: string;
  zone: string;
  area: string;
  subArea: string;
  type: string;
  capacity: number;
  new?: boolean;
}

export interface WarehouseType {
  id: string;
  name: string;
  isDefault?: boolean | null;
  address?: string;
  inventory?: number;
}

export interface ZoneType {
  id: string;
  name: string;
  code: string;
}

export interface AreaType {
  id: string;
  name: string;
  code: string;
  zoneCode: string;
}

export interface SubAreaType {
  id: string;
  name: string;
  code: string;
  areaCode: string;
}
