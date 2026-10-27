import Image from "next/image"
import type { ReactNode } from "react"
import networkLogo from "@/assets/images/join/network-logo.png"
import { Highlight } from "@/components/collabora/section"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-blue-secondary underline decoration-1 decoration-blue-secondary/40 underline-offset-4 transition-colors hover:decoration-blue-secondary focus-visible:decoration-2 focus-visible:outline-none"
    >
      {children}
    </a>
  )
}

export function Introduction() {
  return (
    <section
      className={cn(CONTAINER, "grid items-center gap-x-16 gap-y-10 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]")}
    >
      <div className="flex min-w-0 flex-col gap-6">
        <h2 className={SECTION_TITLE}>Cosa significa far parte di PoliNetwork</h2>
        <div className={cn(SECTION_LEAD, "flex max-w-200 flex-col gap-5")}>
          <p>
            PoliNetwork è gestita interamente da <Highlight>studenti del Politecnico di Milano</Highlight>.
          </p>
          <p>
            Tutto ciò che funziona, funziona perché c’è qualcuno che lo costruisce e lo mantiene: studenti che moderano
            centinaia di gruppi ogni giorno, sviluppano strumenti, gestiscono comunicazione, recruiting ed eventi.{" "}
            <Highlight>Su base volontaria, senza compenso economico.</Highlight>
          </p>
          <p>
            PoliNetwork è un <Highlight>progetto con impatto reale e misurabile</Highlight>. Nel corso del tempo, si
            ottengono competenze difficilmente acquisibili altrove e il{" "}
            <Highlight>
              tipo di esperienza che spesso si cerca dopo la laurea, ma che qui è disponibile durante.
            </Highlight>
          </p>
          {/* The three ways are already listed here: they jump to their sections, instead of a row of extra cards */}
          <p>
            Ci sono tre modi per fare parte di PoliNetwork: <SectionLink href="#admin">diventare admin</SectionLink>,{" "}
            <SectionLink href="#team">entrare in uno dei team operativi</SectionLink> o{" "}
            <SectionLink href="#socio">diventare socio</SectionLink>.
          </p>
        </div>
      </div>
      <Image src={networkLogo} alt="" sizes="224px" className="hidden h-auto w-56 justify-self-center xl:block" />
    </section>
  )
}
