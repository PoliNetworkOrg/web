import { DataTable } from "@/components/data-table";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { columns } from "./columns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBoardUniqueMembers } from "@/server/actions/board";

export default async function ManagementBoard() {
  const uniqueMembers = await getBoardUniqueMembers();

  return (
    <main className="container mx-auto grid space-y-8 px-4 py-8">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/management" className="opacity-50">
          Management
        </Link>{" "}
        <ArrowRight />
        Board
      </h2>

      {(uniqueMembers.length < 5 || uniqueMembers.length > 9) && (
        <Alert variant="warning">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            This configuration of the board is not permitted by the statue.
            Please adjust it to reach a number of members 5 &le; n &le; 9.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 justify-start space-y-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl font-bold">
            Total Members: {uniqueMembers.length}
          </h3>
          <Link href="/admin/management/board/edit">
            <Button>Edit</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={uniqueMembers} />
      </div>
    </main>
  );
}
