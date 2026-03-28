import "server-only"
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetRecentEnrollments() {
  await requireAdmin();

  return await prisma.enrollment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      Course: {
        select: {
          title: true,
        },
      },
      User: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
}
