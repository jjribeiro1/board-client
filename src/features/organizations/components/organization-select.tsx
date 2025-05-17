"use client";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrganizationsFromUser } from "../hooks/use-organizations-from-user";
import { selectOrganizationAction } from "../actions/select-organization-action";
import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";

export function OrganizationSelect() {
  const { data: userInfo } = useLoggedUserInfo();
  const { data: organizations, isPending } = useOrganizationsFromUser(userInfo?.id);

  return (
    <div className="flex flex-col gap-4">
      {isPending ? (
        <div className="flex justify-center h-52">
          <LoaderCircle />
        </div>
      ) : (
        organizations?.map((organization) => (
          <Button
            key={organization.id}
            onClick={() => selectOrganizationAction(organization.id)}
            className="w-full"
            variant={"outline-solid"}
            size={"lg"}
          >
            {organization.name}
          </Button>
        ))
      )}
    </div>
  );
}
