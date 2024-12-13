import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function ManagementHome() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 text-3xl font-bold text-accent-foreground">
        Management
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link href="/admin/management/board">
          <Card className="transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle>Board</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage the board members.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/management/departments">
          <Card className="transition-colors hover:bg-accent/80">
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage the departments members.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
