import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const result = await req.text();
  const token = result.split("=")[1] || "";
  const cookieStore = await cookies();
  cookieStore.set("paymentId", token, {
    httpOnly: true,
    maxAge: 600,
  });

  redirect("/dash/packages/result");
}
