import { prisma } from "@/lib/db";

export async function getPopularCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        status: "Published",
      },
      take: 4,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        chapter: {
          select: {
            id: true,
          },
        },
        enrollment: {
          select: {
            id: true,
          },
        },
      },
    });

    return courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      description: course.smallDescription || course.description,
      duration: `${course.duration} hours`,
      level: course.level,
      students: course.enrollment.length,
      modules: course.chapter.length,
      price: `$${(course.price / 100).toFixed(0)}`,
      slug: course.slug,
    }));
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return [];
  }
}
