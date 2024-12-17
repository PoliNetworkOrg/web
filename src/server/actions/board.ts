"use server";

import { board, users } from "../db/schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import {
  BOARD_ROLE,
  type TBoardRole,
  INCOMPATIBLE_BOARD_ROLES as IBR,
} from "@/constants";

const BOARD_ROLE_ORDER: TBoardRole[] = [
  BOARD_ROLE.PRESIDENT,
  BOARD_ROLE.VICE_PRESIDENT,
  BOARD_ROLE.SECRETARY,
  BOARD_ROLE.TREASURER,
  BOARD_ROLE.MEMBER,
] as const;

const roleOrderMap = BOARD_ROLE_ORDER.reduce(
  (acc, role, index) => ({ ...acc, [role]: index }),
  {} as Record<string, number>,
);

export async function getBoardUniqueMembers() {
  const uniqueMembers = await db
    .select({
      userId: board.userId,
      roles: sql<TBoardRole[]>`array_agg(${board.role})`.as("roles"),
      user: users,
    })
    .from(board)
    .innerJoin(users, eq(board.userId, users.id))
    .groupBy(board.userId, users.id);

  uniqueMembers.forEach((r) =>
    r.roles.sort(
      (a, b) => (roleOrderMap[a] ?? Infinity) - (roleOrderMap[b] ?? Infinity),
    ),
  );
  uniqueMembers.sort(
    (a, b) =>
      (roleOrderMap[a.roles[0]!] ?? Infinity) -
      (roleOrderMap[b.roles[0]!] ?? Infinity),
  );

  return uniqueMembers;
}

export async function assignBoardRole(values: {
  userId: string;
  role: TBoardRole;
}) {
  const old = await db.query.board.findMany({
    where: (t, { and, eq }) => and(eq(t.userId, values.userId)),
  });

  if (old.length === 0) {
    await db.insert(board).values(values);
    revalidatePath("/admin/management/board");
    revalidatePath("/admin/management/board/edit");
    return;
  }

  if (old.length === 2) {
    const incompatible = old.find((o) => o.role !== BOARD_ROLE.TREASURER);
    if (!incompatible) return;
    if (values.role === BOARD_ROLE.MEMBER)
      throw new Error(
        "You must unassign previous role, before declassing to a member",
      );

    await db
      .update(board)
      .set({ role: values.role })
      .where(
        and(eq(board.userId, values.userId), eq(board.role, incompatible.role)),
      );
    revalidatePath("/admin/management/board");
    revalidatePath("/admin/management/board/edit");
    return;
  }

  // old.length === 1
  const { role } = old[0]!;
  if (role === values.role) return;
  if (values.role === BOARD_ROLE.MEMBER)
    throw new Error(
      "You must unassign previous role, before declassing to a member",
    );
  if (
    role === BOARD_ROLE.MEMBER ||
    (IBR.includes(role) && IBR.includes(values.role))
  )
    await db
      .update(board)
      .set({ role: values.role })
      .where(eq(board.userId, values.userId));

  if (role === BOARD_ROLE.TREASURER || values.role === BOARD_ROLE.TREASURER)
    await db.insert(board).values(values);

  revalidatePath("/admin/management/board");
  revalidatePath("/admin/management/board/edit");
}

export async function unassignBoardRole(values: {
  userId: string;
  role: TBoardRole;
}) {
  await db
    .delete(board)
    .where(and(eq(board.userId, values.userId), eq(board.role, values.role)));

  revalidatePath("/admin/management/board");
  revalidatePath("/admin/management/board/edit");
}

export async function unassignUserFromBoard(values: { userId: string }) {
  await db.delete(board).where(and(eq(board.userId, values.userId)));

  revalidatePath("/admin/management/board");
  revalidatePath("/admin/management/board/edit");
}
