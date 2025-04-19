
import React from "react";
import { Loading } from "@/components/ui/custom/loading";

export const LoadingState = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loading text="Loading stock update..." />
    </div>
  );
};
