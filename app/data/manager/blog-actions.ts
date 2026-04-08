"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "../admin/require-admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
  const session = await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  await prisma.blog.create({
    data: {
      title,
      content,
      excerpt,
      category,
      image,
      slug,
      authorId: session.user.id,
      published: true,
    },
  });

  revalidatePath("/manager/blogs");
  revalidatePath("/blog");
  redirect("/manager/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const published = formData.get("published") === "true";

  await prisma.blog.update({
    where: { id },
    data: {
      title,
      content,
      excerpt,
      category,
      image,
      published,
    },
  });

  revalidatePath("/manager/blogs");
  revalidatePath("/blog");
  redirect("/manager/blogs");
}

export async function deleteBlog(id: string) {
  await requireAdmin();

  await prisma.blog.delete({
    where: { id },
  });

  revalidatePath("/manager/blogs");
  revalidatePath("/blog");
  return { success: true };
}

export async function toggleBlogPublished(id: string, currentPublished: boolean) {
  await requireAdmin();

  await prisma.blog.update({
    where: { id },
    data: { published: !currentPublished },
  });

  revalidatePath("/manager/blogs");
  revalidatePath("/blog");
  return { success: true };
}

export async function managerGetBlogs() {
  await requireAdmin();

  return await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
}
