"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { TTGUser } from "@/server/db/schema";

export const columns: ColumnDef<TTGUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tgUser",
    header: "Name",
  },
  {
    id: "role-actions",
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center justify-end gap-2">
        </div>
      );
    },
  },
];

