"use client";

import { useLoggedUserInfo } from "@/features/auth/hooks/use-logged-user-info";

export function useUserPermission(orgId: string) {
  const { data: loggedUser } = useLoggedUserInfo();
  const userOrganization = loggedUser?.organizations.filter((org) => org.organizationId === orgId);
  const isAdminOrOwnerFromOrg = userOrganization?.some((org) => org.role === "ADMIN" || org.role === "OWNER");

  return {
    loggedUser,
    isAdminOrOwnerFromOrg,
  };
}
