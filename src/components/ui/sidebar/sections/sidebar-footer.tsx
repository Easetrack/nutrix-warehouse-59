
import * as React from "react";
import { cn } from "@/lib/utils";

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("mt-auto flex flex-col gap-2.5 p-3 border-t border-sidebar-border/50", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";
