
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Location } from "@/common/utils/auth";

interface WarehouseCardProps {
  location: Location;
  onClick: (location: Location) => void;
  isSelected?: boolean;
  primaryColor?: string;
}

export const WarehouseCard = ({ 
  location, 
  onClick, 
  isSelected = false, 
  primaryColor = '#6366f1' // default fallback color
}: WarehouseCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(location)}
      className="cursor-pointer"
    >
      <Card className={`overflow-hidden transition-all hover:shadow-md ${
        isSelected ? `ring-2 ring-[${primaryColor}] bg-[${primaryColor}]/10` : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <MapPin 
                className="h-4 w-4" 
                style={{ color: primaryColor }} 
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-left">{location.name}</h3>
                <p className="text-sm text-muted-foreground text-left">
                  {location.address || 'Thailand'}
                </p>
                <p 
                  className="text-sm text-left" 
                  style={{ color: primaryColor }}
                >
                  {location.inventory || '0'} items in inventory
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
