import Image from "next/image"
import Link from "next/link"
import { FiHome } from "react-icons/fi"
import notFoundBackground from "@/assets/shapes/not-found.svg"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden">
      <section className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image src={notFoundBackground} alt="" aria-hidden priority className="h-auto w-full max-w-4xl select-none" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-40 text-center sm:gap-12">
          <h1 className="typo-display-extralarge inline-block bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-9 text-transparent">
            404
          </h1>

          {/* 32px with no side padding ran edge to edge on phones: one step smaller there, and each sentence on its line */}
          <p className="typo-headline-extrasmall sm:typo-headline-large max-w-3xl text-balance text-text-primary">
            Non trovo quello che cerchi.
            <br />
            Controlla l&apos;URL o visita un&apos;altra sezione del sito.
          </p>

          <Button asChild variant="primary" size="lg">
            <Link href="/">
              Home
              <FiHome />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
