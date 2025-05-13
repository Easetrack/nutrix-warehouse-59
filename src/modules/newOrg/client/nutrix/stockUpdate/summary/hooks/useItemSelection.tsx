
import { useState } from "react";

export const useItemSelection = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (itemIds: string[]) => {
    if (selectedItems.length === itemIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(itemIds);
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return {
    selectedItems,
    handleSelectAll,
    handleSelectItem
  };
};
