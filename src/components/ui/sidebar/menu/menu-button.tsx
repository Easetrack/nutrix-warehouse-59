
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebar } from "../sidebar-context";

export const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2.5 overflow-hidden rounded-lg p-2.5 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding,background-color,transform] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4.5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-[1.02]",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))] hover:scale-[1.02]",
      },
      size: {
        default: "h-10 text-sm",
        sm: "h-8 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type TooltipContentProps = React.ComponentProps<typeof TooltipContent>;

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | TooltipContentProps;
  variant?: VariantProps<typeof sidebarMenuButtonVariants>["variant"];
  size?: VariantProps<typeof sidebarMenuButtonVariants>["size"];
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const isCollapsed = state === "collapsed" && !isMobile;
    
    let icon = null;
    let text = null;
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === 'span') {
        text = child;
      } else if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (!icon) {
          icon = child;
        }
      }
    });
    
    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          sidebarMenuButtonVariants({ variant, size }), 
          isActive && "bg-primary/10 text-primary font-medium shadow-sm",
          isCollapsed && "justify-center p-2",
          className
        )}
        {...props}
      >
        {isCollapsed ? (
          <span className="flex items-center justify-center">
            {icon && React.cloneElement(icon as React.ReactElement, { 
              size: 22, // Slightly larger icon for collapsed mode
              className: cn((icon as React.ReactElement).props.className, "text-primary") 
            })}
          </span>
        ) : (
          children
        )}
      </Comp>
    );

    if (!tooltip || isMobile) {
      return button;
    }

    const tooltipContent = typeof tooltip === "string" 
      ? { children: tooltip } 
      : tooltip;

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltipContent}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
