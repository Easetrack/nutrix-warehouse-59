
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const DialogHeaderSection: React.FC = () => {
  return (
    <DialogHeader className="bg-white p-4 border-b sticky top-0 z-10">
      <DialogTitle className="text-xl font-bold">Product Details</DialogTitle>
      <p className="text-sm text-gray-500">View Product Information</p>
    </DialogHeader>
  );
};
