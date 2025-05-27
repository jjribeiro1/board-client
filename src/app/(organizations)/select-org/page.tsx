import Link from "next/link";
import { OrganizationSelect } from "@/features/organizations/components/organization-select";
import { buttonVariants } from "@/components/ui/button";

export default function SelectOrganizationPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-96 flex-col gap-8">
        <h1 className="text-center text-2xl font-medium">Escolha sua organização</h1>
        <OrganizationSelect />
        <Link href={"/create-org"} className={buttonVariants({ size: "lg" })}>
          Criar nova organização
        </Link>
      </div>
    </main>
  );
}
