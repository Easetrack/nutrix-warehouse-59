
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
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
    <div className="border rounded-xl flex flex-col items-center justify-center py-10 bg-white">
      <p className="text-lg font-semibold mb-1">Total Products</p>
      <div className="text-4xl font-bold">{productsCount}</div>
    </div>
    <div className="border rounded-xl flex flex-col items-center justify-center py-10 bg-white">
      <p className="text-lg font-semibold mb-1">Categories</p>
      <div className="text-4xl font-bold">{categoriesCount}</div>
    </div>
    <div className="border rounded-xl flex flex-col items-center justify-center py-10 bg-white">
      <p className="text-lg font-semibold mb-1">Total Stock</p>
      <div className="text-3xl font-bold">{totalStock}</div>
    </div>
  </div>
);

export default ProductSummaryCard;
