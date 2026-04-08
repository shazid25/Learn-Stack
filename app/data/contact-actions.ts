"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });

  revalidatePath("/manager"); // Assuming we'll add a section to view messages
  return { success: true };
}
