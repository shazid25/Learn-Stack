import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "../admin/require-admin";

export async function managerGetUsers() {
  await requireAdmin(); // Both admins and managers can use this

  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
