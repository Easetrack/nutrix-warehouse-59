
import React from "react";
import { ProductImageSectionProps } from "../../types/detailsComponentTypes";

export const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  image,
  productName,
}) => {
  return (
    <div className="w-full aspect-square bg-gray-100 flex items-center justify-center border border-gray-200 rounded-md overflow-hidden">
      <img
        src={image || "/placeholder.svg"}
        alt={productName}
        className="max-h-full max-w-full object-contain"
        onError={(e) => {(e.target as HTMLImageElement).src = "/placeholder.svg"}}
      />
    </div>
  );
};
