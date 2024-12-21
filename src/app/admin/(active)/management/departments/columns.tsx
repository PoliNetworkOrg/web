"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useTransition } from "react";
import { deleteDepartment } from "@/server/actions/departments";
import Link from "next/link";

export type Department = {
  id: string;
  name: string;
  shortName: string | null;
};

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shortName",
    header: "Short Name",
    cell: (cell) =>
      cell.getValue() ?? <span className="italic opacity-50">undefined</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center justify-end gap-2">
          <Link href={`/admin/management/departments/${row.original.id}`}>
            <Button size="icon" variant="outline">
              <Eye />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export const orphanColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shortName",
    header: "Short Name",
    cell: (cell) =>
      cell.getValue() ?? <span className="italic opacity-50">undefined</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center justify-end gap-2">
          <Link href={`/admin/management/departments/${row.original.id}`}>
            <Button size="icon" variant="outline">
              <Eye />
            </Button>
          </Link>
          <Delete data={row.original} />
        </div>
      );
    },
  },
];

function Delete({ data }: { data: Department }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await deleteDepartment({ id: data.id });
      setOpen(false);
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            department &quot;<span className="font-bold">{data.name}</span>
            &quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
