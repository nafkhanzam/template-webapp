export const roles = ["USER"] as const;
export type Role = typeof roles[number];

export type User = {
  fullName: string;
  email: string;
  role: Role;
  imageUrl?: string;
};
