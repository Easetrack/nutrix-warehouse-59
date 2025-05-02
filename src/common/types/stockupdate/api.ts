
export interface StockUpdateQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  searchDate?: string;
  expiredDate?: string;
  categoryId?: string;
  typeId?: string;
  subTypeId?: string;
  barcode?: string;
  productId?: string;
  productName?: string;
  unitId?: string;
  serialNo?: string;
  stockId?: string;
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
  sortColumn?: string | null;
  sortDirection?: "asc" | "desc";
  // Allow dynamic sort properties like sortByProductId, sortByProductName, etc.
  sortByProductId?: "asc" | "desc";
  sortByProductName?: "asc" | "desc";
  sortByTotalLot?: "asc" | "desc";
  sortByCategoryName?: "asc" | "desc";
  sortByTagQty?: "asc" | "desc";
  sortByNonTagQty?: "asc" | "desc";
  sortByQty?: "asc" | "desc";
  sortByUnitName?: "asc" | "desc";
  sortByTotalLocation?: "asc" | "desc";
  [key: string]: string | number | null | undefined; // Allow dynamic properties for sorting
}

export interface StockUpdateLotInQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  searchDate?: string;
  categoryId: string;
  categoryName: string;
  typeId: string;
  typeName: string;
  subTypeId: string;
  subTypeName: string;
  productId: string;
  barcode: string;
  productName: string;
  colorId: string;
  color: string | null;
  sizeId: string;
  size: string | null;
  unitId: string;
  unitName: string;
  lotMaster: string;
  shelfLifeDays: number;
  expiredDate: string; // ISO format
  stockId: string;
  warehouse: string;
  zoneId: string;
  zoneName: string;
  areaId: string;
  areaName: string;
  subAreaId: string;
  subAreaName: string;
  qty: number;
  tagQty: number;
  nonTagQty: number;
  image: string;
  combinedLocation: string;
  isExpired: string | number;
  expiredStatus: string;
  [key: string]: string | number | null | undefined; // Allow dynamic properties for sorting
}

export interface StockUpdateLotQueryParams extends StockUpdateQueryParams {
  sortByCategory?: "asc" | "desc";
  sortByType?: "asc" | "desc";
  sortBySubType?: "asc" | "desc";
  sortByBarcode?: "asc" | "desc";
  sortByProductId?: "asc" | "desc";
  sortByProductName?: "asc" | "desc";
  sortByUnit?: "asc" | "desc";
  sortByQty?: "asc" | "desc";
  sortByTags?: "asc" | "desc";
  sortByNonTags?: "asc" | "desc";
  searchTerm?: string; // Add searchTerm to the interface to fix the type errors
}
