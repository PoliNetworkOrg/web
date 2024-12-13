"use server";

import { departments } from "../db/schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function createDepartment(values: {
  name: string;
  shortName: string;
}) {
  await db.insert(departments).values({
    name: values.name,
    shortName: values.shortName.length > 0 ? values.shortName : null,
  });

  revalidatePath("/admin/management/departments");
  redirect("/admin/management/departments");
}

export async function deleteDepartment(values: { id: string }) {
  await db.delete(departments).where(eq(departments.id, values.id));

  revalidatePath("/admin/management/departments");
}
