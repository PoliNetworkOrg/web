import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/server/auth";

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
        <h2 className="mb-4 text-3xl font-bold">Admin page</h2>

        <form
          action={logout}
          className="mb-4 flex items-center justify-between rounded-lg border-2 p-4"
        >
          <p>
            Benvenuto, {session.user.name}{" "}
            <span className="text-foreground/60">{`<${session.user.email}>`}</span>
          </p>
          <Button variant="destructive" type="submit">
            Logout
          </Button>
        </form>
      </main>
    )
  );
}
