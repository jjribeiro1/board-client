import Link from "next/link";
import { CreateOrganization } from "@/features/organizations/components/create-organization";
import { buttonVariants } from "@/components/ui/button";

export default function CreateOrganizationPage() {
  return (
    <main className="relative h-[100dvh] w-[100dvw]">
      <div className="flex w-full justify-end">
        <Link
          href={"/select-org"}
          className={buttonVariants({
            className: "mr-4 mt-4",
            variant: "secondary",
          })}
        >
          Minhas organizações
        </Link>
      </div>
      <div className="flex flex-col gap-8 w-96 lg:w-[400px] absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Qual o nome do seu produto?</h1>
          <h2 className="text-base">Vamos criar sua organização</h2>
        </div>

        <CreateOrganization />
      </div>
    </main>
  );
}
