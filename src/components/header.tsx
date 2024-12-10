import Image from "next/image";
import { GlobeIcon, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeButton } from "@/components/theme-button";
import { Separator } from "@/components/ui/separator";
import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";

export async function Header() {
  const session = await auth();
  return (
    <header className="w-full bg-card shadow-md">
      <div className="container mx-auto flex items-center justify-center space-x-6 px-4 py-4">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="https://raw.githubusercontent.com/PoliNetworkOrg/Logo/refs/heads/master/Logo.svg"
              alt="PoliNetwork Logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold text-accent-foreground">PoliNetwork</h1>
          </div>
        </Link>
        <nav className="flex grow items-center justify-end space-x-8">
          <Link
            href="/"
            className="hover:text-accent-foreground"
          >
            Home
          </Link>
        </nav>
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-6">
          <button
            onClick={async () => {
              "use server";
              if (session?.user) await signOut();
              else redirect("/login?callbackUrl=/admin");
            }}
            className="text-foreground hover:text-accent-foreground"
          >
            {session?.user ? <LogOut /> : <LogIn />}
          </button>
          <ThemeButton />
          <button className="hover:text-accent-foreground">
            <GlobeIcon className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
