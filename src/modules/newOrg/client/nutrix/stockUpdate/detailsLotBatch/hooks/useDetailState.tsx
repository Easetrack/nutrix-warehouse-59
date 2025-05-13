
import { useState } from "react";
import { StockItem } from "@/common/types/stockupdate/lotBatch";

export const useDetailState = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<unknown>(null);

  return {
    isDetailOpen,
    setIsDetailOpen,
    selectedItem,
    setSelectedItem
  };
};
