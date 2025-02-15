import Image from "next/image";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { ThemeButton } from "@/components/theme-button";
import { Separator } from "@/components/ui/separator";

export const HEADER_HEIGHT = "4.5rem";

export async function Header() {
  return (
    <header className="sticky top-0 isolate z-20 flex h-[--header-height] w-full shrink-0 items-center justify-center border-b bg-card">
      <div className="container mx-auto flex items-center justify-center space-x-6 px-4">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="https://raw.githubusercontent.com/PoliNetworkOrg/Logo/refs/heads/master/Logo.svg"
              alt="PoliNetwork Logo"
              width={40}
              height={40}
            />
            <h1 className="hidden text-2xl font-bold text-accent-foreground md:block">
              PoliNetwork
            </h1>
          </div>
        </Link>
        <nav className="flex grow items-center justify-end space-x-8">
          <Link href="/" className="hover:text-accent-foreground">
            Home
          </Link>
        </nav>
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-6">
          <ThemeButton />
          <button className="hover:text-accent-foreground">
            <GlobeIcon className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
