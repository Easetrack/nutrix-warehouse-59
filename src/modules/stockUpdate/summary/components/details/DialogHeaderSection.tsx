
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const DialogHeaderSection: React.FC = () => {
  return (
    <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b sticky top-0 z-10">
      <DialogTitle className="text-lg font-semibold">Product Details</DialogTitle>
      <p className="text-sm text-gray-600">View Product Information</p>
    </DialogHeader>
  );
};
