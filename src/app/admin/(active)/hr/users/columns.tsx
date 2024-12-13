"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { USER_ROLE, type TUserRole } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export type User = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  image: string | null;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (cell) => (
      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={cell.row.original.image ?? ""}
            alt={cell.getValue<string>()}
          />
          <AvatarFallback className="rounded-lg">
            {getInitials(cell.getValue<string>())}
          </AvatarFallback>
        </Avatar>
        <p>{cell.getValue<string>()}</p>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (cell) => {
      const role = cell.getValue<TUserRole>();
      if (role === USER_ROLE.ADMIN_ORG) return "Owner";
      if (role === USER_ROLE.INACTIVE) return "Inactive";
      if (role === USER_ROLE.MEMBER) return "Member";
      if (role === USER_ROLE.DISABLED) return <span className="text-destructive">Disabled</span>;
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex w-full items-center justify-end gap-2">
  //         <Button size="icon" variant="outline">
  //           <Pen />
  //         </Button>
  //         <Delete data={row.original} />
  //       </div>
  //     );
  //   },
  // },
];
