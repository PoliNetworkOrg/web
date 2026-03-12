import { Button } from "@/components/ui/button"

export function AboutUs() {
  const gradientText = "bg-gradient-to-r from-blue-primary to-blue-secondary bg-clip-text text-transparent"

  return (
    <section className="flex w-full justify-center px-4 sm:px-6">
      <div className="flex min-h-[calc(100vh-var(--header-height))] w-full max-w-5xl flex-col items-center justify-center gap-8 py-8 text-center sm:py-12 md:gap-10">
        <div className="typo-headline-small text-text-primary sm:typo-headline-medium lg:typo-headline-large">
          <div className="grid grid-cols-[auto_auto] justify-center">
            <span>PoliNetwork&nbsp;</span>
            <span className={gradientText}>unisce gli studenti</span>
          </div>
          <div className="grid grid-cols-[auto_auto] justify-center">
            <span>del Poli:&nbsp;</span>
            <span className={gradientText}>gruppi, risorse e</span>
          </div>
          <div className="grid grid-cols-[auto_auto] justify-center">
            <span>supporto,&nbsp;</span>
            <span className={gradientText}>tutti in un'unica</span>
          </div>
          <div className="grid grid-cols-[auto_auto] justify-center">
            <span />
            <span className={gradientText}>community.</span>
          </div>
        </div>

        <Button variant="primary" size="lg">
          About us
        </Button>
      </div>
    </section>
  )
}
