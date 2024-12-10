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
    <header className="w-full bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-center space-x-6 px-4 py-4">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="https://raw.githubusercontent.com/PoliNetworkOrg/Logo/refs/heads/master/Logo.svg"
              alt="PoliNetwork Logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold">PoliNetwork</h1>
          </div>
        </Link>
        <nav className="flex grow items-center justify-end space-x-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
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
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            {session?.user ? <LogOut /> : <LogIn />}
          </button>
          <ThemeButton />
          <button className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
            <GlobeIcon className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
