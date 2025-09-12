export type Tag = {
  id: string;
  name: string;
  color: string;
  isSystemDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  organizationId: string | null;
};
