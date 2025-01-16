"use client";

import type { TAboutBoard } from "@/server/db/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "lucide-react";

export const columns: ColumnDef<TAboutBoard>[] = [
  {
    id: "state",
    header: "",
    accessorFn: (t) => t.endedOn,
    cell: (cell) => (
      <div className="flex items-center gap-2 w-20">
        {cell.getValue() ? <Badge>CURRENT</Badge> : <></>}
      </div>
    ),
  },
  {
    id: "number",
    accessorKey: "iterationNum",
    header: "#",
  },
];
