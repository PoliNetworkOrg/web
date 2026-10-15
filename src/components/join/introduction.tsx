import Image from "next/image"
import { FiMessageCircle, FiUserCheck, FiUsers } from "react-icons/fi"
import networkLogo from "@/assets/images/join/network-logo.png"
import { CardIcon } from "@/components/card-icon"
import { Highlight, SectionTitle } from "@/components/collabora/section"

const paths = [
  { title: "Diventa Admin", icon: FiMessageCircle, href: "#admin" },
  { title: "Entra in un Team", icon: FiUsers, href: "#team" },
  { title: "Diventa Socio", icon: FiUserCheck, href: "#socio" },
]

export function Introduction() {
  return (
    <section className="mx-auto grid w-full max-w-330 items-start gap-16 px-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
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
      <div className="flex min-w-0 flex-col items-center gap-10 self-center">
        <Image src={networkLogo} alt="" sizes="224px" className="hidden h-auto w-56 xl:block" />
        <ul
          aria-label="Tre modi per fare parte di PoliNetwork"
          className="grid w-full gap-4 lg:grid-cols-3 xl:grid-cols-1"
        >
          {paths.map((path) => (
            <li key={path.href} className="min-w-0">
              <CardIcon {...path} align="inline" size="inline-sm" className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
