
import React, { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import ProductSummaryCard from "./ProductSummaryCard";
import ProductTable from "./ProductTable";
import ProductDialog from "./ProductDialog";
import ProductDeleteDialog from "./ProductDeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const initialProducts = [
  { id: "PROD-001", name: "Premium Dog Food", category: "Dog Food", group: "Dog Food", subGroup: "Dog Food", stock: 125, uom: "Kg" },
  { id: "PROD-002", name: "Standard Dog Food", category: "Dog Food", group: "Dog Food", subGroup: "Dog Food", stock: 324, uom: "Kg" },
  { id: "PROD-003", name: "Cat Toy Mouse", category: "Cat Toys", group: "Cat Toys", subGroup: "Cat Toys", stock: 76, uom: "Pc" },
  { id: "PROD-004", name: "Premium Cat Food", category: "Cat Food", group: "Cat Food", subGroup: "Cat Food", stock: 108, uom: "Kg" },
  { id: "PROD-005", name: "Dog Bone Toy", category: "Dog Toys", group: "Dog Toys", subGroup: "Dog Toys", stock: 54, uom: "Pc" },
];

const ProductSettings: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleteProduct, setDeleteProduct] = useState<any>(null);
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

  const handleSave = (newProduct: any) => {
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
    <div className="max-w-screen-xl mx-auto mt-6 mb-10 px-2">
      <h1 className="text-3xl font-bold mb-1">Product</h1>
      <p className="text-muted-foreground mb-6">Manage your product catalog and inventory settings.</p>
      <ProductSummaryCard
        productsCount={products.length}
        categoriesCount={categories.length}
        totalStock={`${totalStockKg} Kg | ${totalStockPc} Pc`}
      />
      <div className="flex flex-col sm:flex-row sm:items-center w-full gap-3 mb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-1 gap-2"
        >
          <Input
            placeholder="Search All"
            className="bg-gray-50 h-12 rounded-lg border px-4 border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="button"
            className="h-12 w-32 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold gap-2"
            onClick={() => {}}
          >
            <Search className="w-5 h-5" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-32 rounded-lg border border-gray-300 text-gray-700 font-semibold gap-2"
            onClick={() => setSearch("")}
          >
            <X className="w-5 h-5" />
            Clear
          </Button>
        </form>
        <Button
          type="button"
          className="h-12 w-full sm:w-44 rounded-lg flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold gap-2 ml-0 sm:ml-auto"
          onClick={() => {
            setShowAdd(true);
            setEditingProduct(null);
          }}
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl">
        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct(p);
            setShowAdd(true);
          }}
          onDelete={(p) => setDeleteProduct(p)}
        />
      </div>
      <ProductDialog
        open={showAdd}
        onOpenChange={(v) => {
          setShowAdd(v);
          if (!v) setEditingProduct(null);
        }}
        onSave={handleSave}
        editingProduct={editingProduct}
      />
      <ProductDeleteDialog
        open={!!deleteProduct}
        onOpenChange={(v) => {
          if (!v) setDeleteProduct(null);
        }}
        onConfirm={handleDelete}
        productName={deleteProduct?.name || ""}
      />
      {showDeleteSuccess && (
        <div className="fixed right-6 bottom-6 z-50 w-[350px] pointer-events-none">
          <div className="bg-white border border-green-200 shadow-lg rounded-xl px-6 py-5 flex items-center gap-4 pointer-events-auto">
            <img src="/lovable-uploads/41779e4b-6637-49e8-a6a9-e99c9993ed56.png" alt="Warehouse" className="w-12 h-12" />
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
