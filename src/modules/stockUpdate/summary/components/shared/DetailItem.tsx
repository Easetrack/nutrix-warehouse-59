
import React from "react";
import { DetailItemProps } from "../../types/dialogTypes";

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-2">
    <p className="text-xs font-medium">{label}:</p>
    <p className="text-sm font-medium overflow-hidden text-ellipsis">{value}</p>
  </div>
);
