import Image from "next/image"
import networkLogo from "@/assets/images/join/network-logo.png"
import logoTrail from "@/assets/shapes/join/logo-trail.svg"
import { Highlight, SectionTitle, sectionContainerClass } from "@/components/collabora/section"
import { cn } from "@/lib/utils"

export function Introduction() {
  return (
    <section
      className={cn(sectionContainerClass, "grid items-start gap-16 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]")}
    >
      <div className="flex min-w-0 flex-col gap-6 text-center md:text-start">
        <SectionTitle>Cosa significa far parte di PoliNetwork</SectionTitle>
        <div className="typo-body-large sm:typo-headline-extrasmall flex flex-col gap-5 text-pretty">
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
            Ci sono tre modi per fare parte di PoliNetwork: diventare admin, entrare in uno dei team operativi o
            diventare socio.
          </p>
        </div>
      </div>
      <div aria-hidden className="relative hidden aspect-square min-w-0 xl:block">
        <Image src={logoTrail} alt="" className="-top-12 -left-8 -rotate-24 absolute h-auto w-155 max-w-none" />
        <Image src={networkLogo} alt="" sizes="273px" className="relative mt-8 h-auto w-full max-w-68" />
      </div>
    </section>
  )
}
