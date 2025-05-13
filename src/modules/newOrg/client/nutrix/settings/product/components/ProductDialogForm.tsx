
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import ProductDialogSelects from "./ProductDialogSelects";

type FormType = {
  id: string;
  name: string;
  category: string;
  group: string;
  subGroup: string;
  stock: number;
  uom: string;
};

type ProductDialogFormProps = {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  loading: {
    loadingCategories: boolean;
    loadingTypes: boolean;
    loadingSubTypes: boolean;
    loadingUnits: boolean;
  };
  options: {
    categoryOptions: unknown[];
    typeOptions: unknown[];
    subTypeOptions: unknown[];
    uomOptions: unknown[];
  };
  onClose: () => void;
  editingProduct: FormType | null | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof FormType, value: string) => void;
};

const ProductDialogForm: React.FC<ProductDialogFormProps> = ({
  form,
  setForm,
  loading,
  options,
  onClose,
  editingProduct,
  handleSubmit,
  handleChange,
  handleSelectChange,
}) => {
  return (
      <form onSubmit={handleSubmit}>
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
          {/* Category, Group, SubGroup, UOM Selects */}
          <ProductDialogSelects
            form={form}
            setForm={setForm}
            loading={loading}
            options={options}
            handleSelectChange={handleSelectChange}
          />

          {/* Stock */}
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
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </Button>
        </DialogFooter>
      </form>
  );
};

export default ProductDialogForm;
