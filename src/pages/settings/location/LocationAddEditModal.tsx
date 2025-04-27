
import React, { useState } from "react";
import { useToast } from "@/common/hooks/use-toast";
import { LocationForm } from "./components/LocationForm";
import { LocationType } from "@/modules/location/types";
import { useLanguage } from "@/stores/language/LanguageContext";

interface LocationAddEditModalProps {
  show: boolean;
  editing: LocationType | null;
  onClose: () => void;
  onSubmit: (loc: LocationType, editing: LocationType | null) => void;
}

const LocationAddEditModal: React.FC<LocationAddEditModalProps> = ({
  show,
  editing,
  onClose,
  onSubmit
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedWarehouse, setSelectedWarehouse] = useState(editing?.name || "");
  const [selectedZone, setSelectedZone] = useState(editing?.zone || "");
  const [selectedArea, setSelectedArea] = useState(editing?.area || "");
  const [selectedSubArea, setSelectedSubArea] = useState(editing?.subArea || "");

  if (!show && !editing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as typeof e.target & {
      id: { value: string };
      type: { value: string };
      capacity: { value: string };
    };

    if (!selectedWarehouse || !selectedZone || !selectedArea || !selectedSubArea) {
      toast({
        title: t('message.error'),
        description: t('message.selectOption'),
        variant: "destructive"
      });
      return;
    }

    const newLoc: LocationType = {
      id: form.id.value,
      name: selectedWarehouse,
      zone: selectedZone,
      area: selectedArea,
      subArea: selectedSubArea,
      type: form.type.value,
      capacity: Number(form.capacity.value)
    };
    onSubmit(newLoc, editing);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
      <div className="bg-white rounded-xl w-full max-w-lg p-8 relative shadow-lg">
        <button
          className="absolute right-5 top-5 text-2xl text-gray-400 font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">
          {editing ? t('location.editLocation') : t('location.addNew')}
        </h2>
        <p className="text-muted-foreground mb-6">
          {editing ? `${t('location.editLocation')} ${editing.id}` : t('location.addNew')}
        </p>
        <LocationForm
          onSubmit={handleSubmit}
          selectedWarehouse={selectedWarehouse}
          selectedZone={selectedZone}
          selectedArea={selectedArea}
          selectedSubArea={selectedSubArea}
          setSelectedWarehouse={setSelectedWarehouse}
          setSelectedZone={setSelectedZone}
          setSelectedArea={setSelectedArea}
          setSelectedSubArea={setSelectedSubArea}
          editing={editing}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default LocationAddEditModal;
