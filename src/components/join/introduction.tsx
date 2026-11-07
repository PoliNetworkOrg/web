import Image from "next/image"
import networkLogo from "@/assets/images/join/network-logo.png"
import { Highlight } from "@/components/collabora/section"
import { CONTAINER, INLINE_LINK, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"

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
          <p>
            Ci sono tre modi per fare parte di PoliNetwork:{" "}
            <a href="#admin" className={INLINE_LINK}>
              diventare admin
            </a>
            ,{" "}
            <a href="#team" className={INLINE_LINK}>
              entrare in uno dei team operativi
            </a>{" "}
            o{" "}
            <a href="#socio" className={INLINE_LINK}>
              diventare socio
            </a>
            .
          </p>
        </div>
      </div>
      <Image src={networkLogo} alt="" sizes="224px" className="hidden h-auto w-56 justify-self-center xl:block" />
    </section>
  )
}
