
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const DialogHeaderSection: React.FC = () => {
  return (
    <DialogHeader className="bg-blue-50 p-4 border-b">
      <DialogTitle className="text-lg font-semibold">Product Details</DialogTitle>
      <p className="text-sm text-gray-500">View Product Information</p>
    </DialogHeader>
  );
};
