import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await requireAdmin();

    // Get enrollment stats
    const enrollmentStats = {
      total: await prisma.enrollment.count(),
      byStatus: await prisma.enrollment.groupBy({
        by: ["status"],
        _count: true,
      }),
      totalAmount: await prisma.enrollment.aggregate({
        _sum: { amount: true },
      }),
      activeAmount: await prisma.enrollment.aggregate({
        where: { status: "Active" },
        _sum: { amount: true },
      }),
      sampleEnrollments: await prisma.enrollment.findMany({
        take: 5,
        select: {
          id: true,
          status: true,
          amount: true,
          createdAt: true,
          User: { select: { email: true } },
          Course: { select: { title: true } },
        },
      }),
    };

    return Response.json(enrollmentStats, { status: 200 });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return Response.json(
      { error: "Unauthorized or error" },
      { status: 403 }
    );
  }
}
