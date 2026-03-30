import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";

interface Params {
  params: Promise<{ projectId: string }>;
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    // Verify admin
    await requireAdmin();

    const { projectId } = await params;

    if (!projectId) {
      return Response.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true },
    });

    if (!project) {
      return Response.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Delete project (cascades to submissions)
    await prisma.project.delete({
      where: { id: projectId },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);

    return Response.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
