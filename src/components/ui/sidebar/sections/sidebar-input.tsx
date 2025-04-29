
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-9 w-full bg-background/80 backdrop-blur-sm shadow-sm focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-lg",
        className
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";
