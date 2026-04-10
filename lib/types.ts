import { SVGProps } from "react";

export type IconType = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

export enum Role {
  Admin = 1,
  CafeOwner = 2,
  User = 3,
}
