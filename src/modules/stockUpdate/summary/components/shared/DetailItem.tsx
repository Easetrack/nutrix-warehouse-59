
import React from "react";

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="grid grid-cols-[1fr,1fr] sm:grid-cols-[1fr,1.5fr] gap-2 overflow-hidden">
    <p className="text-xs font-medium text-gray-600 truncate">{label}:</p>
    <p className="text-xs sm:text-sm font-medium overflow-hidden text-ellipsis break-words">{value}</p>
  </div>
);
