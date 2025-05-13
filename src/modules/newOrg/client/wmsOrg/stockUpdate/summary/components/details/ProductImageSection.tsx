
import React from "react";
import { ProductImageSectionProps } from "../../types/detailsComponentTypes";

export const ProductImageSection: React.FC<ProductImageSectionProps> = ({ image, productName }) => {
  return (
    <div className="bg-gray-100 rounded-md overflow-hidden flex items-center justify-center p-2 sm:p-3 md:p-4 h-24 sm:h-32 md:h-40 lg:h-64">
      <img
        src={image || "/placeholder.svg"}
        alt={productName}
        className="max-h-full max-w-full object-contain"
        onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
      />
    </div>
  );
};
