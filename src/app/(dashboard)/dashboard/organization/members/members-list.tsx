"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganizationMembers } from "@/features/organizations/hooks/use-organization-members";
import { getRolePermissions, userRoleLabel } from "@/utils/user-role-info";
import dayjs from "@/lib/dayjs";
import { Badge } from "@/components/ui/badge";

type Props = {
  organizationId: string;
};

export function OrganizationMembersList(props: Props) {
  const { data: members, isPending, error } = useOrganizationMembers(props.organizationId);

  if (isPending) {
    return <div className="leading-none font-semibold tracking-tight">Carregando informações...</div>;
  }

  if (error) {
    return <div>Erro ao carregar membros da sua organização</div>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {members.map((member) => (
        <li key={member.id}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <CardDescription>{member.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-accent-foreground">
              <p className="font-medium">Função: {userRoleLabel(member.role)}</p>
              <p className="font-medium">{`Entrou ${dayjs(member.createdAt).fromNow()}`}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <div>
                <p className="font-medium">Permissões:</p>
              </div>
              {getRolePermissions(member.role).map((permission) => (
                <Badge key={permission}>{permission}</Badge>
              ))}
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
