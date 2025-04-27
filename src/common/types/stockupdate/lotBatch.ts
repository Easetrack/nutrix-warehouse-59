
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
    packagingTypeName: string;
    packagingTypeId: string;
    packKgs: number;
    totalKgs: number;
    brand: string;
    styleNo: string;
    colorId: string;
    color: string | null;
    sizeId: string;
    size: string | null;
    qty: number;
    unitId: string;
    unitName: string;
    image: string;
    nonTags: number;
    tags: number;
    totalLot: number | null;
    lotNumber: string;
    lotMaster: string;
    lotBatch: string;
    locations: string | null;
    totalLocation: number;
    // Adding fields from lot.ts for compatibility
    shelfLifeDays?: number;
    expiredDate?: string;
    stockId?: string;
    warehouse?: string;
    zoneId?: string;
    zoneName?: string;
    areaId?: string;
    areaName?: string;
    subAreaId?: string;
    subAreaName?: string;
    tagQty?: number;
    nonTagQty?: number;
    combinedLocation?: string;
    isExpired?: boolean;
    expiredStatus?: string;
}

export interface StockResponse {
    perPage: number;
    page: number;
    totalCount: number;
    totalPages: number;
    items: StockItem[] | null;
}
