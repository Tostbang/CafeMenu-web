import { cookies } from "next/headers";
import CallBackCard from "../_components/CallBackCard";
import { redirect } from "next/navigation";

export default async function CallbackPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("paymentId")?.value;
  if (!token) {
    redirect("/dash/packages");
  }
  return <CallBackCard token={token} />;
}
