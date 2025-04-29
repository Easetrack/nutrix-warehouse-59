
import React from "react";
import { ProductImageSectionProps } from "../../types/detailsComponentTypes";

export const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  image,
  productName,
}) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4 rounded-md h-48 shadow-sm hover:shadow-md transition-all duration-300">
      <img
        src={image || "/placeholder.svg"}
        alt={productName}
        className="max-h-full max-w-full object-contain"
        onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
      />
    </div>
  );
};
