
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  productName: string;
};

const ProductDeleteDialog: React.FC<Props> = ({ open, onOpenChange, onConfirm, productName }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <b>{productName}</b>? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => { onConfirm(); onOpenChange(false); }}>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ProductDeleteDialog;
