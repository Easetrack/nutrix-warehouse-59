
import React from "react";

type Props = {
  productsCount: number;
  categoriesCount: number;
  totalStock: string;
};

const ProductSummaryCard: React.FC<Props> = ({
  productsCount,
  categoriesCount,
  totalStock,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Total Products</p>
        <div className="text-4xl font-bold mt-2">{productsCount}</div>
      </div>
    </div>
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Categories</p>
        <div className="text-4xl font-bold mt-2">{categoriesCount}</div>
      </div>
    </div>
    <div className="border rounded-xl bg-white">
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-lg font-semibold">Total Stock</p>
        <div className="text-3xl font-bold mt-2">{totalStock}</div>
      </div>
    </div>
  </div>
);

export default ProductSummaryCard;
