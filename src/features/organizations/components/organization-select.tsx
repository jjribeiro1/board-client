"use client";
import { Button } from "@/components/ui/button";
import { useLoggedUserInfo } from "@/hooks/useLoggedUserInfo";
import { useGetOrganizationsFromUser } from "../hooks/queries/useGetOrganizationsFromUser";
import { selectOrgAction } from "../actions/selectOrgAction";

export function OrganizationSelect() {
  const { data: userInfo } = useLoggedUserInfo();
  const { data: organizations } = useGetOrganizationsFromUser(userInfo?.id);

  return (
    <div className="flex flex-col gap-4">
      {organizations?.map((organization) => (
        <Button
          key={organization.id}
          onClick={() => selectOrgAction(organization.id)}
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
