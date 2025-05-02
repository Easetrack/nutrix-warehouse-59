
import { useState } from "react";

export const useDetailState = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<unknown>(null);

  return {
    isDetailOpen,
    setIsDetailOpen,
    selectedItem,
    setSelectedItem,
  };
};
