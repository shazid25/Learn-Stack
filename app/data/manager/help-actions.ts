"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "../admin/require-admin";
import { revalidatePath } from "next/cache";

// Category Actions
export async function createHelpCategory(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const position = parseInt(formData.get("position") as string || "0");

  await prisma.helpCategory.create({
    data: { title, description, icon, position },
  });

  revalidatePath("/help");
  revalidatePath("/manager/help");
}

export async function updateHelpCategory(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const position = parseInt(formData.get("position") as string || "0");

  await prisma.helpCategory.update({
    where: { id },
    data: { title, description, icon, position },
  });

  revalidatePath("/help");
  revalidatePath("/manager/help");
}

export async function deleteHelpCategory(id: string) {
  await requireAdmin();

  await prisma.helpCategory.delete({
    where: { id },
  });

  revalidatePath("/help");
  revalidatePath("/manager/help");
}

// Article Actions
export async function createHelpArticle(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const position = parseInt(formData.get("position") as string || "0");

  await prisma.helpArticle.create({
    data: { title, content, categoryId, position },
  });

  revalidatePath("/help");
  revalidatePath("/manager/help");
}

export async function updateHelpArticle(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const position = parseInt(formData.get("position") as string || "0");

  await prisma.helpArticle.update({
    where: { id },
    data: { title, content, categoryId, position },
  });

  revalidatePath("/help");
  revalidatePath("/manager/help");
}

export async function deleteHelpArticle(id: string) {
  await requireAdmin();

  await prisma.helpArticle.delete({
    where: { id },
  });

  revalidatePath("/help");
  revalidatePath("/manager/help");
}
