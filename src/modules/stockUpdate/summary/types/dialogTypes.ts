
import { StockItem } from "@/common/types/stockupdate/summary";

export interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

export interface StockItemDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedItem: StockItem | null;
}
