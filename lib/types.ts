import { SVGProps } from "react";

export type IconType = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

export enum Role {
  Admin = 1,
  CafeOwner = 2,
  User = 3,
}

export const RoleLabels: Record<Role, string> = {
  [Role.Admin]: "Admin",
  [Role.CafeOwner]: "Kafe Sahibi",
  [Role.User]: "Kullanıcı",
};

export function getRoleLabel(roleId: number | null | undefined): string {
  if (roleId === Role.Admin) return RoleLabels[Role.Admin];
  if (roleId === Role.CafeOwner) return RoleLabels[Role.CafeOwner];
  if (roleId === Role.User) return RoleLabels[Role.User];
  return "—";
}

export enum DurationType {
  Days = 1,
  Months = 2,
  Years = 3,
}

export const DurationTypeLabels: Record<DurationType, string> = {
  [DurationType.Days]: "Gün",
  [DurationType.Months]: "Ay",
  [DurationType.Years]: "Yıl",
};
