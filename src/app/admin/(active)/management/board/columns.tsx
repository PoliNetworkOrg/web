"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { TBoardRole } from "@/constants";
import type { TUser } from "@/server/db/schema";
import type { ColumnDef } from "@tanstack/react-table";

type BoardUser = {
  userId: string;
  roles: TBoardRole[];
  user: TUser;
};

export const columns: ColumnDef<BoardUser>[] = [
  {
    id: "name",
    header: "Name",
    accessorFn: (a) => a.user.name,
    cell: (cell) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 rounded-lg">
          {cell.row.original.user.image && (
            <AvatarImage
              src={cell.row.original.user.image}
              alt={cell.getValue<string>()}
            />
          )}
          <AvatarFallback className="rounded-lg">
            {getInitials(cell.getValue<string>())}
          </AvatarFallback>
        </Avatar>
        <p>{cell.getValue<string>()}</p>
      </div>
    ),
  },
  {
    id: "roles",
    header: "Roles",
    accessorFn: (a) =>
      a.roles
        .map((r) =>
          r
            .split("_")
            .map((r) => r[0]?.toUpperCase() + r.slice(1))
            .join(" "),
        )
        .join(", "),
  },
];
