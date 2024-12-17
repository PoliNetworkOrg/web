import { SelectUsers } from "@/components/select-users";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/user-card";
import { BOARD_ROLE } from "@/constants";
import {
  assignBoardRole,
  getBoardUniqueMembers,
  unassignBoardRole,
} from "@/server/actions/board";
import { getUsers } from "@/server/actions/users";
import { db } from "@/server/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ManagementBoard() {
  const pres = await db.query.board.findFirst({
    where: (t, { eq }) => eq(t.role, BOARD_ROLE.PRESIDENT),
    with: { user: true },
  });

  const vicePres = await db.query.board.findFirst({
    where: (t, { eq }) => eq(t.role, BOARD_ROLE.VICE_PRESIDENT),
    with: { user: true },
  });

  const secretary = await db.query.board.findFirst({
    where: (t, { eq }) => eq(t.role, BOARD_ROLE.SECRETARY),
    with: { user: true },
  });

  const treasurer = await db.query.board.findFirst({
    where: (t, { eq }) => eq(t.role, BOARD_ROLE.TREASURER),
    with: { user: true },
  });

  const members = await db.query.board.findMany({
    where: (t, { eq }) => eq(t.role, BOARD_ROLE.MEMBER),
    with: { user: true },
  });

  const membersWithRoleIds = [pres, vicePres, secretary, treasurer]
    .filter((a) => a !== undefined)
    .map((a) => a.userId);

  const selectRoleUsers = await getUsers();
  const selectMemberUsers = await getUsers({ excludedIds: membersWithRoleIds });

  const uniqueMembers = await getBoardUniqueMembers();
  const maxMembersLeft = 9 - uniqueMembers.length;

  return (
    <main className="container mx-auto grid space-y-8 px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/management" className="opacity-50">
          Management
        </Link>{" "}
        <ArrowRight />
        <Link href="/admin/management/board" className="opacity-50">
          Board
        </Link>{" "}
        <ArrowRight /> Edit
      </h2>

      <div className="mt-16 grid grid-cols-[1fr_auto_1fr] items-start justify-start space-x-8">
        <div className="grid grid-cols-1 justify-start space-y-4">
          <div className="grid grid-cols-1 justify-start space-y-4">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-xl font-bold">President</h3>
              <SelectUsers
                selectAction={async ([userId]) => {
                  "use server";
                  if (pres)
                    await unassignBoardRole({
                      userId: pres.userId,
                      role: BOARD_ROLE.PRESIDENT,
                    });
                  if (userId)
                    await assignBoardRole({
                      userId,
                      role: BOARD_ROLE.PRESIDENT,
                    });
                }}
                users={selectRoleUsers}
                initialSelectedIds={pres ? [pres.userId] : []}
              />
            </div>
            {pres ? (
              <UserCard
                user={pres.user}
                buttonAction={async (user) => {
                  "use server";
                  await unassignBoardRole({
                    userId: user.id,
                    role: BOARD_ROLE.PRESIDENT,
                  });
                }}
              />
            ) : (
              <span className="italic opacity-50">undefined</span>
            )}
          </div>

          <Separator orientation="horizontal" />

          <div className="grid grid-cols-1 justify-start space-y-4">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-xl font-bold">Vice President</h3>
              <SelectUsers
                selectAction={async ([userId]) => {
                  "use server";
                  if (vicePres)
                    await unassignBoardRole({
                      userId: vicePres.userId,
                      role: BOARD_ROLE.VICE_PRESIDENT,
                    });
                  if (userId)
                    await assignBoardRole({
                      userId,
                      role: BOARD_ROLE.VICE_PRESIDENT,
                    });
                }}
                users={selectRoleUsers}
                initialSelectedIds={vicePres ? [vicePres.userId] : []}
              />
            </div>
            {vicePres ? (
              <UserCard
                user={vicePres.user}
                buttonAction={async (user) => {
                  "use server";
                  await unassignBoardRole({
                    userId: user.id,
                    role: BOARD_ROLE.VICE_PRESIDENT,
                  });
                }}
              />
            ) : (
              <span className="italic opacity-50">undefined</span>
            )}
          </div>

          <Separator orientation="horizontal" />

          <div className="grid grid-cols-1 justify-start space-y-4">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-xl font-bold">Secretary</h3>
              <SelectUsers
                selectAction={async ([userId]) => {
                  "use server";
                  if (secretary)
                    await unassignBoardRole({
                      userId: secretary.userId,
                      role: BOARD_ROLE.SECRETARY,
                    });
                  if (userId)
                    await assignBoardRole({
                      userId,
                      role: BOARD_ROLE.SECRETARY,
                    });
                }}
                users={selectRoleUsers}
                initialSelectedIds={secretary ? [secretary.userId] : []}
              />
            </div>
            {secretary ? (
              <UserCard
                user={secretary.user}
                buttonAction={async (user) => {
                  "use server";
                  await unassignBoardRole({
                    userId: user.id,
                    role: BOARD_ROLE.SECRETARY,
                  });
                }}
              />
            ) : (
              <span className="italic opacity-50">undefined</span>
            )}
          </div>

          <Separator orientation="horizontal" />

          <div className="grid grid-cols-1 justify-start space-y-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold">Treasurer</h3>
                <p className="text-sm opacity-70">
                  Note: can also be held by those who hold the other social
                  charges
                </p>
              </div>

              <SelectUsers
                selectAction={async ([userId]) => {
                  "use server";
                  if (treasurer)
                    await unassignBoardRole({
                      userId: treasurer.userId,
                      role: BOARD_ROLE.TREASURER,
                    });
                  if (userId)
                    await assignBoardRole({
                      userId,
                      role: BOARD_ROLE.TREASURER,
                    });
                }}
                users={selectRoleUsers}
                initialSelectedIds={treasurer ? [treasurer.userId] : []}
              />
            </div>
            {treasurer ? (
              <UserCard
                user={treasurer.user}
                buttonAction={async (user) => {
                  "use server";
                  await unassignBoardRole({
                    userId: user.id,
                    role: BOARD_ROLE.TREASURER,
                  });
                }}
              />
            ) : (
              <span className="italic opacity-50">undefined</span>
            )}
          </div>
        </div>

        <Separator orientation="vertical" />

        <div className="grid grid-cols-1 justify-start space-y-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-bold">Members</h3>
            <SelectUsers
              selectAction={async (userIds) => {
                "use server";
                for (const userId of userIds)
                  await assignBoardRole({ userId, role: BOARD_ROLE.MEMBER });
              }}
              max={maxMembersLeft + members.length}
              users={selectMemberUsers}
              initialSelectedIds={members.map((m) => m.userId)}
              allowMultipleSelection
            />
          </div>
          <p className="text-sm opacity-70">
            Note: These are members without a Social Charge. To declassify a
            member, you must first remove the role from the left section, and
            then you can add it here.
          </p>
          {members.length > 0 ? (
            members.map((m) => (
              <UserCard
                user={m.user}
                key={m.userId}
                buttonAction={async (user) => {
                  "use server";
                  await unassignBoardRole({
                    userId: user.id,
                    role: BOARD_ROLE.MEMBER,
                  });
                }}
              />
            ))
          ) : (
            <span className="italic opacity-50">undefined</span>
          )}
          <p className="text-sm opacity-70">
            {maxMembersLeft} seats available.
          </p>
        </div>
      </div>
    </main>
  );
}
