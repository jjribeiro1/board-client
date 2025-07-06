"use client";
import { SidebarFooter as SidebarFooterUI, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";
import { useLogoutMutation } from "@/features/auth/mutations/use-logout-mutation";

export function SidebarFooter() {
  const { data: loggedUser } = useLoggedUserInfo();
  const { mutate } = useLogoutMutation();

  function handleLogout() {
    mutate();
  }

  return (
    <SidebarFooterUI>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center gap-2">
              <Avatar className="h-7 w-7 cursor-pointer">
                <AvatarFallback>{loggedUser?.name.at(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterUI>
  );
}
