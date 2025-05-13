
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchTypes,
  fetchSubTypes,
  fetchUnits,
} from "@/services/srp/product/product";
import ProductDialogForm from "./ProductDialogForm";

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
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {editingProduct
              ? `Edit details for ${editingProduct.name}`
              : "Enter the details for the new product"}
          </DialogDescription>
        </DialogHeader>
        <ProductDialogForm
          form={form}
          setForm={setForm}
          loading={{
            loadingCategories,
            loadingTypes,
            loadingSubTypes,
            loadingUnits
          }}
          options={{
            categoryOptions,
            typeOptions,
            subTypeOptions,
            uomOptions
          }}
          onClose={handleClose}
          editingProduct={editingProduct}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
