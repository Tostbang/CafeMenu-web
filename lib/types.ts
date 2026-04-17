import { SVGProps } from "react";

export type IconType = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

export enum Role {
  Admin = 1,
  CafeOwner = 2,
  User = 3,
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
