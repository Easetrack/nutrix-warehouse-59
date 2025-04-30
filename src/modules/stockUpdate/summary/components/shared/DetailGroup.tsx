
import React from "react";
import { DetailItemProps } from "../../types/dialogTypes";

export interface DetailGroupProps {
  title: string;
  details: DetailItemProps[];
}

export const DetailGroup: React.FC<DetailGroupProps> = ({ title, details }) => (
  <div className="mb-4">
    <h4 className="text-sm font-semibold mb-2 text-gray-700">{title}</h4>
    <div className="space-y-1.5">
      {details.map((detail, index) => (
        <div key={index} className="grid grid-cols-[1fr,1.5fr] gap-2 overflow-hidden">
          <p className="text-xs text-gray-500 truncate">{detail.label}:</p>
          <p className="text-xs sm:text-sm font-medium overflow-hidden text-ellipsis break-words">{detail.value}</p>
        </div>
      ))}
    </div>
  </div>
);
