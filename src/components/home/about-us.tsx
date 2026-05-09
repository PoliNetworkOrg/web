import { Button } from "@/components/ui/button"

export function AboutUs() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-16 px-7.5 py-12 text-center sm:gap-24">
      <h1 className="typo-headline-medium sm:typo-display-large bg-linear-to-r from-text-primary via-blue-secondary to-blue-primary bg-clip-text text-transparent">
        PoliNetwork unisce gli studenti del Poli: gruppi, risorse e supporto, tutti in un'unica community.
      </h1>

      <Button variant="primary" size="lg">
        About us
      </Button>
    </section>
  )
}
