import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/server/auth";
import { LogOut } from "lucide-react";

async function logout() {
  "use server";

  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}

export default async function AdminHome() {
  const session = await auth();
  return (
    session && (
      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-3xl font-bold text-accent-foreground">
          Admin page
        </h2>

        <form
          action={logout}
          className="mb-4 flex items-center justify-between rounded-lg border-2 p-4"
        >
          <p>
            Benvenuto{" "}
            <span className="ml-0.5 text-accent-foreground">{session.user.name}</span>{" "}
            {`<${session.user.email}>`}
          </p>
          <Button variant="destructive" type="submit">
            <LogOut />
            Logout
          </Button>
        </form>
      </main>
    )
  );
}
