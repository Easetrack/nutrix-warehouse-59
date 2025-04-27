
export interface StockItem {
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
    lotBatch: string;
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
    isExpired: boolean;
    expiredStatus: string;
  }

export interface StockLotResponse {
    perPage: number;
    page: number;
    totalCount: number;
    totalPages: number;
    items: StockItem[] | null;
}
