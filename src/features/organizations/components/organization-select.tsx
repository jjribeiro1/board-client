"use client";
import { Button } from "@/components/ui/button";
import { useLoggedUserInfo } from "@/hooks/use-logged-user-info";
import { useOrganizationsFromUser } from "../hooks/use-organizations-from-user";
import { selectOrganizationAction } from "../actions/select-organization-action";

export function OrganizationSelect() {
  const { data: userInfo } = useLoggedUserInfo();
  const { data: organizations } = useOrganizationsFromUser(userInfo?.id);

  return (
    <div className="flex flex-col gap-4">
      {organizations?.map((organization) => (
        <Button
          key={organization.id}
          onClick={() => selectOrganizationAction(organization.id)}
          className="w-full"
          variant={"outline"}
          size={"lg"}
        >
          {organization.name}
        </Button>
      ))}
    </div>
  );
}
