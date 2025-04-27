
import React from "react";
import { Button } from "@/components/ui/button";
import { Location } from "@/common/utils/auth";

interface WarehouseActionsProps {
  selectedWarehouse: Location | null;
  handleContinue: () => void;
  handleLogout: () => void;
  primaryColor: string;
}

export const WarehouseActions = ({
  selectedWarehouse,
  handleContinue,
  handleLogout,
  primaryColor,
}: WarehouseActionsProps) => {
  return (
    <>
      <Button 
        variant="success" 
        size="lg"
        className="w-full max-w-md mx-auto block"
        disabled={!selectedWarehouse}
        onClick={handleContinue}
        style={{ 
          backgroundColor: primaryColor, 
          color: 'white',
          opacity: selectedWarehouse ? 1 : 0.5
        }}
      >
        CONTINUE
      </Button>

      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          Log Out
        </Button>
      </div>
    </>
  );
};
