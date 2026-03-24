import { Search, Send, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  return (
    <main className="flex w-full justify-center px-4 sm:px-6">
      <section className="flex min-h-[calc(100vh-var(--header-height))] w-full flex-col justify-between py-8 sm:py-12">
        <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center md:gap-16">
          <h1 className="typo-display-medium lg:typo-display-large max-w-5xl text-text-primary">
            Trova gruppi, risorse e supporto
            <br className="hidden md:block" />
            <span className="md:block">tra gli studenti del Polimi</span>
          </h1>

          <div className="flex w-full flex-col items-center gap-8 md:gap-16">
            <Input
              icon={<Search className="h-5 w-5" />}
              type="text"
              placeholder="Find your group"
              aria-label="Find your group"
              containerClassName="max-w-xl"
              className="typo-body-medium"
            />

            <Button variant="primary" size="sm">
              More groups
              <Send />
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Button variant="tertiaryBlur" size="lg" className="text-blue-secondary">
            <UserPlus />
            Sei una matricola?
          </Button>
        </div>
      </section>
    </main>
  )
}
