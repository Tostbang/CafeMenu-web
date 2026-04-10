"use client";

import PublicMenuView from "./_components/PublicMenuView";
import { data } from "./_services/data";

export default function Menu() {
  return <PublicMenuView menu={data.menu} />;
}
