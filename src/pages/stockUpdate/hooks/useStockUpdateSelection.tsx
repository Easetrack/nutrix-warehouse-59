
import { useState } from "react";
import { StockItem } from "@/types/stock";

export const useStockUpdateSelection = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (filteredItems: StockItem[]) => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((i) => i.productId));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return { selectedItems, setSelectedItems, handleSelectAll, handleSelectItem };
};
