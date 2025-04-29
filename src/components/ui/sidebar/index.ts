
// Export the context and hooks
export {
  SidebarProvider,
  useSidebar,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON
} from "./sidebar-context";

// Export the main sidebar component
export { Sidebar } from "./sidebar-main";

// Export sidebar trigger and rail
export { SidebarTrigger, SidebarRail } from "./sidebar-trigger";

// Export sidebar sections
export { 
  SidebarHeader, 
  SidebarFooter, 
  SidebarContent,
  SidebarSeparator,
  SidebarInput,
  SidebarInset
} from "./sections";

// Export sidebar group components
export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent
} from "./sidebar-group";

// Export sidebar menu components
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "./menu";

// Export types
export type { SidebarContextType, SidebarState } from "./types";
export type { SidebarMenuButtonProps } from "./menu";
