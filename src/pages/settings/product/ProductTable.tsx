
import React from "react";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

type Product = {
  id: string;
  name: string;
  category: string;
  group: string;
  subGroup: string;
  stock: number;
  uom: string;
  isNew?: boolean; // for "New" badge in demo
};

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
};

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => (
  <div className="rounded-xl border overflow-auto bg-white">
    <table className="min-w-full w-full">
      <thead>
        <tr className="text-gray-500 font-medium text-sm [&>th]:py-3 [&>th]:px-2 text-left">
          <th className="w-16">No.</th>
          <th className="w-32">Product ID</th>
          <th>Product Name</th>
          <th>Categories</th>
          <th>Group</th>
          <th>Sub Group</th>
          <th className="w-28">Stock</th>
          <th className="w-20">UoM</th>
          <th className="w-20">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={9} className="text-center py-8 text-muted-foreground">No product found.</td>
          </tr>
        ) : (
          products.map((p, i) => (
            <tr
              key={p.id}
              className="border-t even:bg-gray-50 group hover:bg-green-50 text-sm"
            >
              <td className="py-2 px-2">{i + 1}.</td>
              <td className="py-2 px-2">{p.id}</td>
              <td className="py-2 px-2 flex items-center gap-2">
                {p.name}
                {p.isNew && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded ml-2 font-semibold">New</span>
                )}
              </td>
              <td className="py-2 px-2">{p.category}</td>
              <td className="py-2 px-2">{p.group}</td>
              <td className="py-2 px-2">{p.subGroup}</td>
              <td className="py-2 px-2">{p.stock}</td>
              <td className="py-2 px-2">{p.uom}</td>
              <td className="py-2 px-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(p)}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:text-red-700" onClick={() => onDelete(p)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
