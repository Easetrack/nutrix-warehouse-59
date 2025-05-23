
import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSidebar, SIDEBAR_WIDTH_MOBILE } from "./sidebar-context";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, open, setOpen, openMobile, setOpenMobile, toggleSidebar } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground shadow-lg rounded-r-xl",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <>
          <Button 
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="fixed bottom-4 right-4 z-40 rounded-full shadow-lg md:hidden bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Menu size={20} />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          
          <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
            <SheetContent
              data-sidebar="sidebar"
              data-mobile="true"
              className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground shadow-lg flex flex-col"
              style={
                {
                  "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                } as React.CSSProperties
              }
              side={side}
            >
              <div className="absolute top-4 right-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpenMobile(false)} 
                  className="rounded-full"
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="flex h-full w-full flex-col pt-10">{children}</div>
            </SheetContent>
          </Sheet>
        </>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={collapsible}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-300 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[state=collapsed]:w-[--sidebar-width-icon]",
            "group-data-[side=right]:rotate-180"
          )}
        />
        <div
          className={cn(
            "duration-300 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-all ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[state=collapsed]:w-[--sidebar-width-icon]"
              : "right-0 group-data-[state=collapsed]:w-[--sidebar-width-icon]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[state=collapsed]:w-[var(--sidebar-width-icon)]"
              : "group-data-[state=collapsed]:w-[--sidebar-width-icon]",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar shadow-lg 
                     group-data-[variant=floating]:rounded-xl 
                     group-data-[variant=floating]:border 
                     group-data-[variant=floating]:border-sidebar-border 
                     group-data-[variant=floating]:shadow-md
                     group-data-[side=left]:border-r 
                     group-data-[side=right]:border-l
                     group-data-[side=left]:rounded-r-xl 
                     group-data-[side=right]:rounded-l-xl
                     relative overflow-hidden"
          >
            {/* Toggle buttons positioned at the top of sidebar */}
            <div className="absolute top-3 right-3 z-20 flex gap-1">
              {/* Close button - always visible */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)} 
                className={`h-8 w-8 rounded-full hover:bg-sidebar-accent ${open ? '' : 'hidden'}`}
                aria-label="Close Sidebar"
              >
                <X size={16} />
              </Button>
              
              {/* Open button - only visible when collapsed */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(true)} 
                className={`h-8 w-8 rounded-full hover:bg-sidebar-accent ${open ? 'hidden' : ''}`}
                aria-label="Open Sidebar"
              >
                <Menu size={16} />
              </Button>
            </div>
            
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";
