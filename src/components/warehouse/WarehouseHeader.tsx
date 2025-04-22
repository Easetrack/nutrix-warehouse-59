
import React from "react";
import { motion } from "framer-motion";

interface WarehouseHeaderProps {
  primaryColor: string;
}

export const WarehouseHeader = ({ primaryColor }: WarehouseHeaderProps) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
        Select Warehouse
      </h1>
      <p className="mt-2 text-muted-foreground">
        Choose the warehouse you want to work with
      </p>
    </div>
  );
};
