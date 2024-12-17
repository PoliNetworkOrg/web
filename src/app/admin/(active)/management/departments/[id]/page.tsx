import { SelectUsers } from "@/components/select-users";
import { Separator } from "@/components/ui/separator";
import { DEP_ROLE } from "@/constants";
import {
  assignDepartmentRole,
  unassignDepartmentRole,
} from "@/server/actions/departments";
import { getUsers } from "@/server/actions/users";
import { db } from "@/server/db";
import type { TUser } from "@/server/db/schema";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import RenameDepartment from "./rename";
import { UserCard } from "@/components/user-card";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: departmentId } = await params;
  const department = await db.query.departments.findFirst({
    where: (t, { eq }) => eq(t.id, departmentId),
  });

  if (!department) redirect("/admin/management/departments");
  const head = await db.query.departmentUsers.findFirst({
    where: (t, { eq, and }) =>
      and(eq(t.departmentId, departmentId), eq(t.role, DEP_ROLE.HEAD)),
    with: { user: true },
  });

  const deputyHeads = await db.query.departmentUsers.findMany({
    where: (t, { eq, and }) =>
      and(eq(t.departmentId, departmentId), eq(t.role, DEP_ROLE.DEPUTY_HEAD)),
    with: { user: true },
  });

  const members = await db.query.departmentUsers.findMany({
    where: (t, { eq, and }) =>
      and(eq(t.departmentId, departmentId), eq(t.role, DEP_ROLE.MEMBER)),
    with: { user: true },
  });

  const selectHeadUsers = await getUsers({
    excludedIds: deputyHeads.map((u) => u.userId),
  });

  const selectDeputyUsers = await getUsers({
    excludedIds: head ? [head?.userId] : [],
  });

  const selectMemberUsers = await getUsers({
    excludedIds: deputyHeads
      .map((u) => u.userId)
      .concat(head ? [head?.userId] : []),
  });

  async function handleHeadSelect(ids: string[]) {
    "use server";
    const userId = ids[0];

    if (head)
      await unassignDepartmentRole({
        userId: head.userId,
        departmentId: head.departmentId,
      });

    if (!userId) {
      return;
    }

    await assignDepartmentRole({ userId, departmentId, role: DEP_ROLE.HEAD });
  }

  async function handleDeputyHeadSelect(ids: string[]) {
    "use server";

    for (const dh of deputyHeads) {
      if (!ids.includes(dh.userId)) {
        await unassignDepartmentRole({
          userId: dh.userId,
          departmentId: dh.departmentId,
        });
      } else {
        ids.filter((id) => id !== dh.userId);
      }
    }

    for (const userId of ids) {
      await assignDepartmentRole({
        userId,
        departmentId,
        role: DEP_ROLE.DEPUTY_HEAD,
      });
    }
  }

  async function handleMemberSelect(ids: string[]) {
    "use server";

    for (const m of members) {
      if (!ids.includes(m.userId)) {
        await unassignDepartmentRole({
          userId: m.userId,
          departmentId: m.departmentId,
        });
      } else {
        ids.filter((id) => id !== m.userId);
      }
    }

    for (const userId of ids) {
      await assignDepartmentRole({
        userId,
        departmentId,
        role: DEP_ROLE.MEMBER,
      });
    }
  }

  async function handleUnassignUser(user: TUser) {
    "use server";
    await unassignDepartmentRole({ userId: user.id, departmentId });
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/management" className="opacity-50">
          Management
        </Link>{" "}
        <ArrowRight />{" "}
        <Link href="/admin/management/departments" className="opacity-50">
          Departments
        </Link>{" "}
        <ArrowRight /> {department.name}{" "}
        {department.shortName && <span>({department.shortName})</span>}
      </h2>

      <RenameDepartment
        id={department.id}
        name={department.name}
        shortName={department.shortName}
      />

      <div className="mt-16 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start justify-start space-x-8">
        <div className="grid grid-cols-1 justify-start space-y-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-bold">Head</h3>
            <SelectUsers
              selectAction={handleHeadSelect}
              users={selectHeadUsers}
              initialSelectedIds={head ? [head.userId] : []}
            />
          </div>
          {head ? (
            <UserCard user={head.user} buttonAction={handleUnassignUser} />
          ) : (
            <span className="italic opacity-50">undefined</span>
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="grid grid-cols-1 justify-start space-y-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-bold">Deputy Head(s)</h3>
            <SelectUsers
              selectAction={handleDeputyHeadSelect}
              users={selectDeputyUsers}
              initialSelectedIds={deputyHeads.map((h) => h.userId)}
              allowMultipleSelection
            />
          </div>
          {deputyHeads.length > 0 ? (
            deputyHeads.map((m) => (
              <UserCard
                user={m.user}
                key={m.userId}
                buttonAction={handleUnassignUser}
              />
            ))
          ) : (
            <span className="italic opacity-50">undefined</span>
          )}
        </div>

        <Separator orientation="vertical" />

        <div className="grid grid-cols-1 justify-start space-y-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-bold">Members</h3>
            <SelectUsers
              selectAction={handleMemberSelect}
              users={selectMemberUsers}
              initialSelectedIds={members.map((m) => m.userId)}
              allowMultipleSelection
            />
          </div>
          {members.length > 0 ? (
            members.map((m) => (
              <UserCard
                user={m.user}
                key={m.userId}
                buttonAction={handleUnassignUser}
              />
            ))
          ) : (
            <span className="italic opacity-50">undefined</span>
          )}
        </div>
      </div>
    </main>
  );
}
