import { DataTable } from "@/components/data-table";
import { ArrowRight } from "lucide-react";
import { columns } from "./columns";
import { db } from "@/server/db";
import Link from "next/link";

export default async function ManagementDepartments() {
  const departments = await db.query.departments.findMany();

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/management" className="opacity-50">Management</Link> <ArrowRight />{" "}
        Departments
      </h2>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg text-accent-foreground">Department List</h3>
      </div>
      <DataTable columns={columns} data={departments} />
    </main>
  );
}
