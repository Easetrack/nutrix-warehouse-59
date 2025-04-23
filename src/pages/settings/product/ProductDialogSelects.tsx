
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type FormType = {
  id: string;
  name: string;
  category: string;
  group: string;
  subGroup: string;
  stock: number;
  uom: string;
};

type ProductDialogSelectsProps = {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  loading: {
    loadingCategories: boolean;
    loadingTypes: boolean;
    loadingSubTypes: boolean;
    loadingUnits: boolean;
  };
  options: {
    categoryOptions: any[];
    typeOptions: any[];
    subTypeOptions: any[];
    uomOptions: any[];
  };
  handleSelectChange: (field: keyof FormType, value: string) => void;
};

const ProductDialogSelects: React.FC<ProductDialogSelectsProps> = ({
  form,
  loading,
  options,
  handleSelectChange,
}) => {
  return (
    <>
      {/* Category Select */}
      <Select
        value={form.category}
        onValueChange={(v) => handleSelectChange("category", v)}
        disabled={loading.loadingCategories}
      >
        <SelectTrigger className="bg-gray-50 w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {options.categoryOptions
            .filter((cat) => cat.id && cat.id.trim() !== "") // Filter out empty IDs
            .map((cat) => (
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
        disabled={loading.loadingTypes || !form.category}
      >
        <SelectTrigger className="bg-gray-50 w-full">
          <SelectValue placeholder="Select Group" />
        </SelectTrigger>
        <SelectContent>
          {options.typeOptions
            .filter((type) => type.id && type.id.trim() !== "") // Filter out empty IDs
            .map((type) => (
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
        disabled={loading.loadingSubTypes || !form.group}
      >
        <SelectTrigger className="bg-gray-50 w-full">
          <SelectValue placeholder="Select Sub Group" />
        </SelectTrigger>
        <SelectContent>
          {options.subTypeOptions
            .filter((stype) => stype.id && stype.id.trim() !== "") // Filter out empty IDs
            .map((stype) => (
              <SelectItem key={stype.id} value={stype.id}>
                {stype.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* UOM Select */}
      <Select
        value={form.uom}
        onValueChange={(v) => handleSelectChange("uom", v)}
        disabled={loading.loadingUnits || !form.category}
      >
        <SelectTrigger className="bg-gray-50 w-full">
          <SelectValue placeholder="Select UoM" />
        </SelectTrigger>
        <SelectContent>
          {options.uomOptions
            .filter((uom) => uom.name && uom.name.trim() !== "") // Filter out empty names
            .map((uom) => (
              <SelectItem key={uom.id} value={uom.name || uom.id}>
                {uom.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default ProductDialogSelects;
