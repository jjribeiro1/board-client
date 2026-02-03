"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";
import { useLogoutMutation } from "@/features/auth/mutations/use-logout-mutation";

export function UserAvatarDropdown() {
  const { data: loggedUser } = useLoggedUserInfo();
  const logout = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>{loggedUser?.name.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => logout.mutate()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
