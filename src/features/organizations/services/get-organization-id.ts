import { cookies } from "next/headers";

export async function getOrganizationId() {
  const cookieStore = await cookies();
  const orgId = cookieStore.get("org-id");
  if (!orgId) {
    return null;
  }
  return orgId.value;
}
