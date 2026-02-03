"use client";
import { useParams, usePathname } from "next/navigation";
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown";
import { useOrganizationInfo } from "../hooks/use-organization-info";

export function PublicOrganizationHeader() {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const { data: organization } = useOrganizationInfo(params.id, pathname.includes("/posts"));

  return (
    <header className="flex items-center justify-between border px-8 py-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{organization?.name}</h1>
      </div>

      <div className="pr-10">
        <UserAvatarDropdown />
      </div>
    </header>
  );
}
