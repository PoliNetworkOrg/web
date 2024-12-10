import { redirect } from "next/navigation";
import { signIn, providerMap, auth } from "@/server/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SIGNIN_ERROR_URL = "/api/auth/error";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center px-4 py-8">
      <Card>
        <CardHeader className="items-center py-8">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-12">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: callbackUrl ?? "",
                  });
                } catch (error) {
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }

                  // Otherwise if a redirects happens Next.js can handle it
                  // so you can just re-thrown the error and let Next.js handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <Button type="submit" variant="outline" className="w-72 py-6">
                <span>Sign in with {provider.name}</span>
              </Button>
            </form>
          ))}

          <Button
            type="submit"
            variant="outline"
            disabled
            className="w-72 py-6"
          >
            <span>Sign in with ... (coming soon)</span>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
