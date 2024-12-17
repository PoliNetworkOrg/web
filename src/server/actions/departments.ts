"use server";

import { departments, departmentUsers } from "../db/schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import type { TDepRole } from "@/constants";

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

export async function renameDepartment(values: {
  id: string;
  name: string;
  shortName: string;
}) {
  await db
    .update(departments)
    .set({
      name: values.name,
      shortName: values.shortName.length > 0 ? values.shortName : null,
    })
    .where(eq(departments.id, values.id));

  revalidatePath("/admin/management/departments");
  revalidatePath(`/admin/management/departments/${values.id}`);
}

export async function deleteDepartment(values: { id: string }) {
  await db.delete(departments).where(eq(departments.id, values.id));

  revalidatePath("/admin/management/departments");
}

export async function assignDepartmentRole(values: {
  userId: string;
  departmentId: string;
  role: TDepRole;
}) {
  const alreadyExisting = await db.query.departmentUsers.findFirst({
    where: (t, { and, eq }) =>
      and(eq(t.userId, values.userId), eq(t.departmentId, values.departmentId)),
  });

  if (alreadyExisting)
    await db
      .update(departmentUsers)
      .set({ role: values.role })
      .where(
        and(
          eq(departmentUsers.userId, values.userId),
          eq(departmentUsers.departmentId, values.departmentId),
        ),
      );
  else await db.insert(departmentUsers).values(values);

  revalidatePath("/admin/management/departments");
  revalidatePath(`/admin/management/departments/${values.departmentId}`);
}

export async function unassignDepartmentRole(values: {
  userId: string;
  departmentId: string;
}) {
  await db
    .delete(departmentUsers)
    .where(
      and(
        eq(departmentUsers.userId, values.userId),
        eq(departmentUsers.departmentId, values.departmentId),
      ),
    );

  revalidatePath("/admin/management/departments");
  revalidatePath(`/admin/management/departments/${values.departmentId}`);
}

export async function unassignUserFromAllDepartments(values: {
  userId: string;
}) {
  await db
    .delete(departmentUsers)
    .where(and(eq(departmentUsers.userId, values.userId)));

  revalidatePath("/admin/management/departments");
  revalidatePath(`/admin/management/departments/[id]`, "page");
}
