import Link from "next/link";
import { OrganizationSelect } from "@/features/organizations/components/organization-select";
import { buttonVariants } from "@/components/ui/button";

export default function SelectOrganizationPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-8 w-96">
        <h1 className="text-2xl text-center font-medium">
          Escolha sua organização
        </h1>
        <OrganizationSelect />
        <Link href={"/create-org"} className={buttonVariants({ size: "lg" })}>
          Criar nova organização
        </Link>
      </div>
    </main>
  );
}
