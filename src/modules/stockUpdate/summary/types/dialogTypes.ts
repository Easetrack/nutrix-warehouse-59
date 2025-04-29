
import { StockItem } from "@/common/types/stockupdate/summary";
import { StockItem as LotStockItem } from "@/common/types/stockupdate/lot";

export interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

export interface StockItemDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
}

export interface LotDetailsTableProps {
  lotDetails: LotStockItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}
