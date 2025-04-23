
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchTypes,
  fetchSubTypes,
  fetchUnits,
} from "@/services/product";

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

const ProductDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  onSave,
  editingProduct,
}) => {
  const [form, setForm] = useState(defaultForm);

  // fetch categories when form is open
  const { data: categoryOptions = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["prod-categories"],
    queryFn: fetchCategories,
    enabled: open,
  });

  // fetch types when category changes
  const { data: typeOptions = [], isLoading: loadingTypes } = useQuery({
    queryKey: ["prod-types", form.category],
    queryFn: () => fetchTypes(form.category),
    enabled: open && !!form.category,
  });

  // fetch subtypes when type changes
  const { data: subTypeOptions = [], isLoading: loadingSubTypes } = useQuery({
    queryKey: ["prod-subtypes", form.group],
    queryFn: () => fetchSubTypes(form.group),
    enabled: open && !!form.group,
  });

  // fetch units when category changes
  const { data: uomOptions = [], isLoading: loadingUnits } = useQuery({
    queryKey: ["prod-uoms", form.category],
    queryFn: () => fetchUnits(form.category),
    enabled: open && !!form.category,
  });

  useEffect(() => {
    if (open && editingProduct) setForm(editingProduct);
    else if (open) setForm(defaultForm);
  }, [open, editingProduct]);

  // reset subsequent selects when parent changes
  useEffect(() => {
    if (form.category) {
      setForm((prev) => ({
        ...prev,
        group: "",
        subGroup: "",
        uom: "",
      }));
    }
  }, [form.category]);
  
  useEffect(() => {
    if (form.group) {
      setForm((prev) => ({
        ...prev,
        subGroup: "",
      }));
    }
  }, [form.group]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.category || !form.group || !form.subGroup || !form.uom)
      return;
    onSave(form);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct
                ? `Edit details for ${editingProduct.name}`
                : "Enter the details for the new product"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 grid gap-2">
            <Input
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="Enter Product ID"
              className="bg-gray-50"
              required
            />
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="bg-gray-50"
              required
            />

            {/* Category Select */}
            <Select
              value={form.category}
              onValueChange={(v) => handleSelectChange("category", v)}
              disabled={loadingCategories}
            >
              <SelectTrigger className="bg-gray-50 w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Group Select */}
            <Select
              value={form.group}
              onValueChange={(v) => handleSelectChange("group", v)}
              disabled={loadingTypes || !form.category}
            >
              <SelectTrigger className="bg-gray-50 w-full">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* SubGroup Select */}
            <Select
              value={form.subGroup}
              onValueChange={(v) => handleSelectChange("subGroup", v)}
              disabled={loadingSubTypes || !form.group}
            >
              <SelectTrigger className="bg-gray-50 w-full">
                <SelectValue placeholder="Select Sub Group" />
              </SelectTrigger>
              <SelectContent>
                {subTypeOptions.map((stype) => (
                  <SelectItem key={stype.id} value={stype.id}>
                    {stype.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stock, UOM */}
            <Input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter Stock"
              min={0}
              className="bg-gray-50"
              required
            />

            <Select
              value={form.uom}
              onValueChange={(v) => handleSelectChange("uom", v)}
              disabled={loadingUnits || !form.category}
            >
              <SelectTrigger className="bg-gray-50 w-full">
                <SelectValue placeholder="Select UoM" />
              </SelectTrigger>
              <SelectContent>
                {uomOptions.map((uom) => (
                  <SelectItem key={uom.id} value={uom.name}>
                    {uom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
