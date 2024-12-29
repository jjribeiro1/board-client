"use client";
import { SidebarHeader as SidebarHeaderUI } from "@/components/ui/sidebar";
import { useOrganizationInfo } from "@/features/organizations/hooks/use-organization-info";

type Props = {
  organizationId: string;
};

export function SidebarHeader(props: Props) {
  const { data } = useOrganizationInfo(props.organizationId);
  return (
    <SidebarHeaderUI>
      <p className="text-xl font-semibold tracking-tight text-center">
        {data?.name}
      </p>
    </SidebarHeaderUI>
  );
}
