import "server-only"
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetTeam() {
  await requireAdmin();

  return await prisma.user.findMany({
    where: {
      role: "admin",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  });
}
