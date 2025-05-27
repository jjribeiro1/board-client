"use client";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useOrganizationInfo } from "../hooks/use-organization-info";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";

export function PublicOrganizationHeader() {
  const params = useParams<{ id: string }>();
  const { data: organization } = useOrganizationInfo(params.id);
  const { data: loggedUser } = useLoggedUserInfo();

  return (
    <header className="flex items-center justify-between border px-8 py-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{organization?.name}</h1>
      </div>

      <div className="pr-10">
        <Avatar>
          <AvatarFallback>{loggedUser?.name.at(0)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
