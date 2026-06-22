import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { CreateRoadmapDialog } from "@/features/roadmaps/components/create-roadmap-dialog";
import { RoadmapsList } from "./_components/roadmaps-list";

export default async function OrganizationRoadmapsPage() {
  const orgId = await getOrganizationId();
  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Roadmaps</h1>
        <CreateRoadmapDialog organizationId={orgId!} />
      </div>
      <RoadmapsList organizationId={orgId!} />
    </section>
  );
}
