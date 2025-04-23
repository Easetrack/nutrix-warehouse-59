
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  category: string;
  group: string;
  subGroup: string;
  stock: number;
  uom: string;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (product: Product) => void;
  editingProduct?: Product | null;
};

const defaultForm = {
  id: "",
  name: "",
  category: "",
  group: "",
  subGroup: "",
  stock: 0,
  uom: "",
};

const ProductDialog: React.FC<Props> = ({ open, onOpenChange, onSave, editingProduct }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (open && editingProduct) setForm(editingProduct);
    else if (open) setForm(defaultForm);
  }, [open, editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "stock" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.name) return;
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? `Edit details for ${editingProduct.name}` : "Enter the details for the new product"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 grid gap-2">
            <Input name="id" value={form.id} onChange={handleChange} placeholder="Enter Product ID" className="bg-gray-50" required />
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Enter Product Name" className="bg-gray-50" required />
            <Input name="category" value={form.category} onChange={handleChange} placeholder="Enter Categories" className="bg-gray-50" required />
            <Input name="group" value={form.group} onChange={handleChange} placeholder="Enter Group" className="bg-gray-50" required />
            <Input name="subGroup" value={form.subGroup} onChange={handleChange} placeholder="Enter Sub Group" className="bg-gray-50" required />
            <Input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Enter Stock" min={0} className="bg-gray-50" required />
            <Input name="uom" value={form.uom} onChange={handleChange} placeholder="Enter UoM" className="bg-gray-50" required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{editingProduct ? "Update Product" : "Add Product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
