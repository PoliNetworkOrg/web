import { Search, Send, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  return (
    <main className="flex w-full flex-1 justify-center px-4 py-8 sm:px-6 sm:py-12">
      <section className="flex w-full flex-col justify-between">
        <div className="flex flex-col items-center gap-10 pt-24 text-center md:gap-16">
          <h1 className="max-w-5xl text-text-primary typo-display-medium lg:typo-display-large">
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
