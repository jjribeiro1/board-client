export enum InviteStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
}

export type Invite = {
  id: string;
  status: InviteStatus;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  expiresAt: Date;
  acceptedAt: Date | null;
  createdAt: Date;
  invitedBy: {
    id: string;
    name: string;
    email: string;
  };
};
