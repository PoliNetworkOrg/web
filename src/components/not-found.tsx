import { FiHome } from "react-icons/fi"
import notFoundBackground from "@/assets/shapes/not-found.svg?img"
import { Image } from "@/components/image"
import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"

export function NotFound() {
  return (
    <>
      {/* A missing page is not a result: search engines must not list its URL */}
      <meta name="robots" content="noindex" />
      <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden">
        <section className="relative flex h-full w-full items-center justify-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Image
              src={notFoundBackground}
              alt=""
              aria-hidden
              priority
              className="h-auto w-full max-w-4xl select-none"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 pt-28 pb-16 text-center sm:gap-12">
            <h1 className="typo-display-extralarge inline-block py-9 text-gradient-grey">404</h1>

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
    </>
  )
}
