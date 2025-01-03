export type Status = {
  id: string;
  name: string;
  color: string;
  isSystemDefault: boolean;
  order: number | null;
  organizationId: string | null;
  createdAt: Date;
  updatedAt: Date;
};
