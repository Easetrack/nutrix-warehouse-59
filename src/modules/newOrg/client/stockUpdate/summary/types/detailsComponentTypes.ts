
import { StockItem } from "@/common/types/stockupdate/lot";

export interface ProductImageSectionProps {
  image: string;
  productName: string;
}

export interface ProductInfoSectionProps {
  qty: number;
  unitName: string;
  productId: string;
  barcode: string;
  productName: string;
  size?: string;
  color?: string;
  styleNo?: string;
  brand?: string;
}

export interface ProductMetaSectionProps {
  categoryName?: string;
}

export interface LotDetailsTableProps {
  lotDetails: StockItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export interface DetailGroupProps {
  title: string;
  details: {
    label: string;
    value: React.ReactNode;
  }[];
}
