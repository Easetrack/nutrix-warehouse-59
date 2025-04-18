
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
  sortByCategory?: string;
  sortByType?: string;
  sortBySubType?: string;
  sortByBarcode?: string;
  sortByProductId?: string;
  sortByProductName?: string;
  sortByUnit?: string;
  sortByQty?: string;
  sortByTags?: string;
  sortByNonTags?: string;
}
