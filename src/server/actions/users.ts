"use server";

import { users } from "../db/schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { type TUserRole } from "@/constants";

export async function changeUserRole(values: {
  id: string;
  newRole: TUserRole;
}) {
  await db
    .update(users)
    .set({
      role: values.newRole,
    })
    .where(eq(users.id, values.id));

  revalidatePath("/admin/hr/users");
}
