
import React from "react";
import { DetailGroupProps } from "../../types/detailsComponentTypes";
import { DetailItem } from "./DetailItem";

export const DetailGroup: React.FC<DetailGroupProps> = ({ title, details }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
      <div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow transition-all duration-300">
        {details.map((detail, index) => (
          <DetailItem key={index} label={detail.label} value={detail.value} />
        ))}
      </div>
    </div>
  );
};
