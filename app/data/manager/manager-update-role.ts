"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "../admin/require-admin";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/lib/generated/prisma";

export async function managerUpdateRole(userId: string, newRole: UserRole) {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/manager/users");
  return { success: true };
}
