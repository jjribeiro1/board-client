"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function selectOrganizationAction(orgId: string) {
  const cookieStore = await cookies();
  cookieStore.set("org-id", orgId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/");
}
