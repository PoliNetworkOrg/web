import Image from "next/image"
import Link from "next/link"
import { FiHome } from "react-icons/fi"
import notFoundBackground from "@/assets/shapes/not-found.svg"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100dvh-var(--header-height))] w-full items-center justify-center overflow-hidden bg-background">
      <section className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image src={notFoundBackground} alt="" aria-hidden priority className="h-auto w-full max-w-4xl select-none" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12 text-center">
          <h1 className="typo-display-extralarge inline-block bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-9 text-transparent">
            404
          </h1>

          <p className="typo-headline-large text-text-primary">
            Non trovo quello che cerchi.
            <br />
            Controlla l'URL o visita un'altra sezione del sito.
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
