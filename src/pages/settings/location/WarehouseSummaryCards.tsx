
import React from "react";

interface SummaryProps {
  warehouseCount: number;
  zoneCount: number;
  areaCount: number;
  subAreaCount: number;
}

const WarehouseSummaryCards: React.FC<SummaryProps> = ({
  warehouseCount,
  zoneCount,
  areaCount,
  subAreaCount,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Warehouse</p>
        <div className="text-4xl font-bold mt-2">{warehouseCount}</div>
      </div>
    </div>
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Zone</p>
        <div className="text-4xl font-bold mt-2">{zoneCount}</div>
      </div>
    </div>
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Area</p>
        <div className="text-4xl font-bold mt-2">{areaCount}</div>
      </div>
    </div>
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Sub Area</p>
        <div className="text-4xl font-bold mt-2">{subAreaCount}</div>
      </div>
    </div>
  </div>
);

export default WarehouseSummaryCards;
