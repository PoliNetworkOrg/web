import Image from "next/image"
import type { ReactNode } from "react"
import externalLink from "@/assets/icons/join/external-link.svg"
import connector from "@/assets/icons/join/membership-connector.svg"
import membersPhoto from "@/assets/images/join/members.png"
import { Highlight, SectionTitle, sectionContainerClass } from "@/components/collabora/section"
import { cn } from "@/lib/utils"
import { membershipSteps } from "./constants"

export function MembershipSection({ photoDecorations }: { photoDecorations: ReactNode }) {
  return (
    <section
      id="socio"
      className={cn(sectionContainerClass, "grid scroll-mt-36 items-start gap-10 xl:grid-cols-2 xl:gap-x-16")}
    >
      <div className="flex min-w-0 flex-col gap-6 text-center md:text-start xl:col-start-1">
        <SectionTitle>
          <span className="md:hidden">Diventa Socio</span>
          <span className="hidden md:inline">Diventa Socio di PoliNetwork</span>
        </SectionTitle>
        <div className="typo-body-large sm:typo-headline-extrasmall flex flex-col gap-5 text-pretty">
          <p>
            Il tesseramento è il modo per fare parte di PoliNetwork in modo formale, con{" "}
            <Highlight>diritto di voto</Highlight> nelle Assemblee dei Soci, di candidarsi alle elezioni del direttivo e{" "}
            <Highlight>accesso ai benefit</Highlight> dell’associazione.
          </p>
          <p>
            <Highlight>È aperto ai membri attivi</Highlight> dell’organizzazione: admin e componenti dei team operativi.
          </p>
        </div>
      </div>
      <ol className="relative flex min-w-0 flex-col gap-8 xl:col-start-2 xl:row-span-2 xl:row-start-1">
        <Image
          src={connector}
          alt=""
          aria-hidden
          className="-translate-x-1/2 absolute top-6 bottom-6 left-6 h-[calc(100%-48px)] w-1 md:top-8 md:bottom-8 md:left-8 md:h-[calc(100%-64px)]"
        />
        {membershipSteps.map((step, index) => (
          <li key={step.title} className="relative flex min-w-0 items-start gap-4 md:gap-6">
            <Image src={step.icon} alt="" className="size-12 shrink-0 md:size-16" />
            <div className="flex min-w-0 flex-col gap-3 pt-2 md:pt-3">
              <h3 className="typo-title-medium sm:typo-title-large text-pretty text-blue-secondary">
                {"href" in step ? (
                  <a
                    href={step.href}
                    target={step.href.startsWith("https:") ? "_blank" : undefined}
                    rel={step.href.startsWith("https:") ? "noopener noreferrer" : undefined}
                    className="decoration-1 underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {step.title}
                    {step.href.startsWith("https:") && (
                      <Image src={externalLink} alt="" className="ml-2 inline-block size-4 align-baseline" />
                    )}
                  </a>
                ) : (
                  step.title
                )}
              </h3>
              {index === 3 && (
                <ul className="typo-body-large list-disc space-y-1 text-pretty pl-5">
                  <li>Utilizza preferibilmente un indirizzo PoliMi valido.</li>
                  <li>Oggetto: “Richiesta ammissione sotto la qualifica di socio”.</li>
                  <li>Inserisci ogni informazione utile da avere, ad esempio il tuo username Telegram.</li>
                  <li>Se ricopri già ruoli in PoliNetwork, specificali.</li>
                </ul>
              )}
              {index === 4 && (
                <p className="typo-body-large text-pretty">
                  Secondo le modalità descritte nella sezione “Ammissione” dello statuto.
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="relative aspect-[642/312] w-full min-w-0 xl:col-start-1 xl:row-start-2">
        <div className="absolute inset-0 overflow-hidden rounded-rectangles">
          <Image
            src={membersPhoto}
            alt="Un gruppo di volontari di PoliNetwork insieme all’aperto"
            sizes="(min-width: 1280px) 40vw, 100vw"
            className="-top-[37.19%] absolute left-0 h-[137.25%] w-full max-w-none"
          />
        </div>
        {photoDecorations}
      </div>
    </section>
  )
}
