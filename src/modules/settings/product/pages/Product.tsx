import React, { useMemo, useState } from "react";
import { Search, RotateCcw, Plus } from "lucide-react";
import ProductSummaryCard from "@/modules/settings/product/components/ProductSummaryCard";
import ProductTable from "@/modules/settings/product/components/ProductTable";
import ProductDialog from "@/modules/settings/product/components/ProductDialog";
import ProductDeleteDialog from "@/modules/settings/product/components/ProductDeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/common/hooks/use-toast";

import { Product } from "@/modules/settings/product/types/types";

const initialProducts: Product[] = [
  { 
    id: "PROD-001", 
    name: "Premium Dog Food", 
    category: "Dog Food", 
    group: "Dog Food", 
    subGroup: "Dog Food", 
    stock: 125, 
    uom: "Kg",
    imageUrl: "https://images.unsplash.com/photo-1582560475093-ba66accbc7f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
  },
  { 
    id: "PROD-002", 
    name: "Standard Dog Food", 
    category: "Dog Food", 
    group: "Dog Food", 
    subGroup: "Dog Food", 
    stock: 324, 
    uom: "Kg",
    imageUrl: "https://images.unsplash.com/photo-1602659944992-29911194c4b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
  },
  { 
    id: "PROD-003", 
    name: "Cat Toy Mouse", 
    category: "Cat Toys", 
    group: "Cat Toys", 
    subGroup: "Cat Toys", 
    stock: 76, 
    uom: "Pc",
    imageUrl: "https://images.unsplash.com/photo-1594136953696-ea8829dd3bf3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
  },
  { 
    id: "PROD-004", 
    name: "Premium Cat Food", 
    category: "Cat Food", 
    group: "Cat Food", 
    subGroup: "Cat Food", 
    stock: 108, 
    uom: "Kg",
    imageUrl: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
  },
  { 
    id: "PROD-005", 
    name: "Dog Bone Toy", 
    category: "Dog Toys", 
    group: "Dog Toys", 
    subGroup: "Dog Toys", 
    stock: 54, 
    uom: "Pc",
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
  },
];

const ProductSettings: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const filteredProducts = useMemo(
    () =>
      search.trim()
        ? products.filter(
          (p) =>
            p.id.toLowerCase().includes(search.toLowerCase()) ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            p.group.toLowerCase().includes(search.toLowerCase()) ||
            p.subGroup.toLowerCase().includes(search.toLowerCase())
        )
        : products,
    [products, search]
  );

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );
  const totalStockKg = useMemo(
    () =>
      products
        .filter((p) => p.uom === "Kg")
        .reduce((sum, p) => sum + p.stock, 0),
    [products]
  );
  const totalStockPc = useMemo(
    () =>
      products
        .filter((p) => p.uom === "Pc")
        .reduce((sum, p) => sum + p.stock, 0),
    [products]
  );
  const productForEdit = editingProduct
    ? products.find((p) => p.id === editingProduct.id)
    : null;

  const handleSave = (newProduct: Product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === newProduct.id ? { ...newProduct } : p))
      );
      toast({ title: "Product Updated", description: "Product has been updated." });
    } else {
      setProducts((prev) => [
        ...prev,
        { ...newProduct, isNew: true },
      ]);
      toast({ title: "Product Added", description: "New product has been added." });
    }
    setEditingProduct(null);
  };

  const handleDelete = () => {
    if (deleteProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
      setShowDeleteSuccess(true);
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    }
  };

  return (
    <div className="w-full px-4 md:px-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Product</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory settings.</p>
        </div>
        <Button
          type="button"
          variant="success"
          className="h-10 rounded-lg flex items-center bg-green-600 hover:bg-green-700 text-white font-medium gap-2"
          onClick={() => {
            setShowAdd(true);
            setEditingProduct(null);
          }}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <ProductSummaryCard
        productsCount={products.length}
        categoriesCount={categories.length}
        totalStock={`${totalStockKg} Kg | ${totalStockPc} Pc`}
      />

      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 mb-4 mt-6">
        <Input
          placeholder="Search All"
          className="bg-white h-10 rounded-lg border px-4 border-gray-200 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          className="h-10 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
          onClick={() => { }}
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium"
          onClick={() => setSearch("")}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="overflow-auto w-full rounded-xl">
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct(p);
            setShowAdd(true);
          }}
          onDelete={(p) => setDeleteProduct(p)}
        />
      </div>

      {showAdd && (
        <ProductDialog
          open={showAdd}
          onOpenChange={(v) => {
            setShowAdd(v);
            if (!v) setEditingProduct(null);
          }}
          onSave={handleSave}
          editingProduct={editingProduct}
        />
      )}

      {deleteProduct && (
        <ProductDeleteDialog
          open={!!deleteProduct}
          onOpenChange={(v) => {
            if (!v) setDeleteProduct(null);
          }}
          onConfirm={handleDelete}
          productName={deleteProduct?.name || ""}
        />
      )}

      {showDeleteSuccess && (
        <div className="fixed right-6 bottom-6 z-50 w-[350px] pointer-events-none">
          <div className="bg-white border border-green-200 shadow-lg rounded-xl px-6 py-5 flex items-center gap-4 pointer-events-auto">
            <img
              src="/lovable-uploads/41779e4b-6637-49e8-a6a9-e99c9993ed56.png"
              alt="Warehouse"
              className="w-12 h-12"
            />
            <div>
              <p className="text-base font-semibold text-green-800 mb-1">Delete Success</p>
              <p className="text-gray-700 text-sm">Your Product has been Confirm successfully.</p>
            </div>
            <button className="ml-auto" aria-label="Close" onClick={() => setShowDeleteSuccess(false)}>
              <span className="text-gray-400 text-2xl font-bold">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSettings;
