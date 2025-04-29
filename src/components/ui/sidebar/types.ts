
import { ReactNode } from "react";

export type SidebarState = "expanded" | "collapsed";

export interface SidebarContextType {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}
