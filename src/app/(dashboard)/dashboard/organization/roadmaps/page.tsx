import { getOrganizationId } from "@/features/organizations/services/get-organization-id";
import { RoadmapsList } from "./_components/roadmaps-list";

export default async function OrganizationRoadmapsPage() {
  const orgId = await getOrganizationId();
  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Roadmaps</h1>
      </div>
      <RoadmapsList organizationId={orgId!} />
    </section>
  );
}
