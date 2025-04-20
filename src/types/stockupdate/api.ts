
export interface StockUpdateQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
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
  [key: string]: string | number | undefined;  // Add index signature to allow dynamic property access
}
