import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const selectedOrgId = cookieStore.get("org-id")?.value;
  if (!selectedOrgId) {
    redirect("/select-org");
  }

  return <div>Home</div>;
}
