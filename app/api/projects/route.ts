import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  courseId: z.string().uuid("Invalid course ID"),
});

export async function POST(req: Request) {
  try {
    // Verify admin
    await requireAdmin();

    const body = await req.json();

    // Validate input
    const { title, description, courseId } = createProjectSchema.parse(body);

    // Verify course exists and is owned by admin
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });

    if (!course) {
      return Response.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description: description || "",
        courseId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    return Response.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
