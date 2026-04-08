"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "../admin/require-admin";
import { revalidatePath } from "next/cache";

export async function createFAQ(formData: FormData) {
  await requireAdmin();

  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  const category = formData.get("category") as string;
  const position = parseInt(formData.get("position") as string || "0");

  await prisma.fAQ.create({
    data: {
      question,
      answer,
      category,
      position,
    },
  });

  revalidatePath("/faq");
  revalidatePath("/manager/faq");
}

export async function updateFAQ(id: string, formData: FormData) {
  await requireAdmin();

  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  const category = formData.get("category") as string;
  const position = parseInt(formData.get("position") as string || "0");

  await prisma.fAQ.update({
    where: { id },
    data: {
      question,
      answer,
      category,
      position,
    },
  });

  revalidatePath("/faq");
  revalidatePath("/manager/faq");
}

export async function deleteFAQ(id: string) {
  await requireAdmin();

  await prisma.fAQ.delete({
    where: { id },
  });

  revalidatePath("/faq");
  revalidatePath("/manager/faq");
}
