import networkLogo from "@/assets/images/join/network-logo.png?img"
import { Highlight } from "@/components/collabora/section"
import { Glass } from "@/components/glass"
import { Image } from "@/components/image"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

export function Introduction() {
  return (
    <section
      className={cn(CONTAINER, "grid items-center gap-x-20 gap-y-12.5 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]")}
    >
      <div className="flex min-w-0 flex-col gap-7.5">
        <h2 className={SECTION_TITLE}>Cosa significa far parte di PoliNetwork</h2>
        <div className={cn(SECTION_LEAD, "flex max-w-200 flex-col gap-6.25")}>
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
          <p>
            Ci sono tre modi per fare parte di PoliNetwork: <Highlight>diventare admin</Highlight>,{" "}
            <Highlight>entrare in uno dei team operativi</Highlight> o <Highlight>diventare socio</Highlight>.
          </p>
        </div>
      </div>
      {/* A round glass bubble around the logo, so it doesn't float on its own */}
      <Glass className="hidden size-72 items-center justify-center justify-self-center rounded-full border-edge/50 bg-background-blur p-0 xl:flex">
        <Image src={networkLogo} alt="" sizes="224px" className="h-auto w-56" />
      </Glass>
    </section>
  )
}
