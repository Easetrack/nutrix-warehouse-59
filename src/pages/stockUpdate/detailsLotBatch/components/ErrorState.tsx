
import React from "react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-red-500 mb-4">{error}</div>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
};
