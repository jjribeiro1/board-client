"use client";

import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";
import { useLogoutMutation } from "@/features/auth/mutations/use-logout-mutation";
import { AvatarUploadItem } from "@/components/avatar-upload-item";

export function UserAvatarDropdown() {
  const { data: loggedUser } = useLoggedUserInfo();
  const logout = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {loggedUser?.avatarUrl && <AvatarImage src={loggedUser.avatarUrl} alt={loggedUser.name} />}
          <AvatarFallback>{loggedUser?.name.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AvatarUploadItem />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout.mutate()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
