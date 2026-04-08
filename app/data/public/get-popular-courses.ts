"use server";

import { prisma } from "@/lib/db";

export async function getPopularCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        status: "Published", // DB-level filtering
      },
      take: 4,
      orderBy: {
        createdAt: "desc", // DB-level ordering
      },
      include: {
        chapter: { select: { id: true } },
        enrollment: { select: { id: true } },
      },
    });

    return courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.smallDescription || course.description,
      duration: `${course.duration} hours`,
      level: course.level,
      students: course.enrollment.length,
      modules: course.chapter.length,
      price: `$${(course.price / 100).toFixed(2)}`,
      slug: course.slug,
    }));
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return [];
  }
}
