
import React from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface LocationType {
  id: string;
  name: string;
  zone: string;
  area: string;
  subArea: string;
  type: string;
  capacity: number;
  new?: boolean;
}
interface LocationDeleteDialogProps {
  show: boolean;
  deleting: LocationType | null;
  onCancel: () => void;
  onConfirm: () => void;
}
const LocationDeleteDialog: React.FC<LocationDeleteDialogProps> = ({
  show,
  deleting,
  onCancel,
  onConfirm
}) => (
  <AlertDialog open={show}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Location</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete {deleting?.id}?<br />
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default LocationDeleteDialog;
