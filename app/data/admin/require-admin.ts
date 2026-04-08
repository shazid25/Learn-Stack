import "server-only";

import { auth, Session } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const requireAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  }) as Session | null;

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin" && session.user.role !== "manager") {
    return redirect("/not-admin");
  }

  return session;
};
