"use client";
import PublicMenuView from "./_components/PublicMenuView";
import { data } from "./_services/data";
import { useGetMenuBySlug } from "./_services/queries";

export default function Menu() {
  const { data } = useGetMenuBySlug("useGetMenuBySlug");
  return <PublicMenuView menu={data?.menu} />;
}
