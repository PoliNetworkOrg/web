import { DataTable } from "@/components/data-table";
import { ArrowRight, InfoIcon, TriangleAlert } from "lucide-react";
import { columns, orphanColumns } from "./columns";
import { db } from "@/server/db";
import { DEPARTMENT_ID } from "@/constants";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code } from "@/components/code";

const departmentIds = Object.values(DEPARTMENT_ID);

export default async function ManagementDepartments() {
  const departments = await db.query.departments.findMany({
    where: (t, { inArray }) => inArray(t.id, departmentIds),
  });

  const oldDepartments = await db.query.departments.findMany({
    where: (t, { notInArray }) => notInArray(t.id, departmentIds),
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/management" className="opacity-50">
          Management
        </Link>{" "}
        <ArrowRight /> Departments
      </h2>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg text-accent-foreground">Department List</h3>
      </div>
      <DataTable columns={columns} data={departments} />
      <Alert variant="info" className="my-4">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>How to delete a Department</AlertTitle>
        <AlertDescription>
          This change must be done inside code first. <br />
          <ol className="list-inside list-decimal">
            <li>
              Go inside <Code>constants.ts</Code> and remove the
              department&apos;s ID from the <Code>DEPARTMENT_ID</Code> object
            </li>
            <li>
              The department will appear below as &quot;orphan&quot; where can
              be definitely removed.
            </li>
          </ol>
          <p className="mt-1 font-medium">
            Note: deleting the department only from the database, would make the
            server regenerate it on restart.
          </p>
        </AlertDescription>
      </Alert>
      {oldDepartments.length > 0 && (
        <>
          <Alert variant="warning" className="mb-4 mt-8">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Orphan Departments</AlertTitle>
            <AlertDescription>
              The following departments are not in the{" "}
              <Code>DEPARTMENT_ID</Code> const object inside{" "}
              <Code>constants.ts</Code>. <br /> This might be intentional or an
              error.{" "}
              <ol className="list-inside list-decimal">
                <li>
                  {" "}
                  intentional action: delete the orphan department with the
                  Trash button{" "}
                </li>
                <li>
                  {" "}
                  error: go inside <Code>constants.ts</Code> and add the id(s)
                  inside the object <Code>DEPARTMENT_ID</Code>
                </li>
              </ol>
            </AlertDescription>
          </Alert>

          <DataTable columns={orphanColumns} data={oldDepartments} />
        </>
      )}
    </main>
  );
}
