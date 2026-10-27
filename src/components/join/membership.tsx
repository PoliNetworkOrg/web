import Image from "next/image"
import externalLink from "@/assets/icons/join/external-link.svg"
import membersPhoto from "@/assets/images/join/members.webp"
import { Highlight } from "@/components/collabora/section"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { PhotoShapes } from "@/components/shapes"
import { cn } from "@/lib/utils"
import { membershipSteps } from "./constants"

export function MembershipSection() {
  return (
    <section id="socio" className={cn(CONTAINER, "grid scroll-mt-36 items-start gap-10 xl:grid-cols-2 xl:gap-x-16")}>
      <div className="flex min-w-0 flex-col gap-6 xl:col-start-1">
        <h2 className={SECTION_TITLE}>
          <span className="md:hidden">Diventa Socio</span>
          <span className="hidden md:inline">Diventa Socio di PoliNetwork</span>
        </h2>
        <div className={cn(SECTION_LEAD, "flex max-w-200 flex-col gap-5")}>
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
      <ol className="flex min-w-0 flex-col xl:col-start-2 xl:row-span-2 xl:row-start-1">
        {membershipSteps.map((step, index) => (
          <li key={step.title} className="flex min-w-0 items-stretch gap-4 md:gap-6">
            <div className="flex shrink-0 flex-col items-center">
              <Image src={step.icon} alt="" className="size-12 md:size-16" />
              {index < membershipSteps.length - 1 && (
                <span
                  aria-hidden
                  className="my-2 min-h-6 w-1 flex-1 rounded-full bg-linear-to-b from-blue-secondary to-blue-primary"
                />
              )}
            </div>
            <div
              className={cn("flex min-w-0 flex-col gap-3 pt-2 md:pt-3", index < membershipSteps.length - 1 && "pb-8")}
            >
              <h3 className="typo-headline-extrasmall sm:typo-title-large text-pretty text-blue-secondary">
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
                <ul className="typo-body-medium sm:typo-body-large list-disc space-y-1 text-pretty pl-5">
                  <li>Utilizza preferibilmente un indirizzo PoliMi valido.</li>
                  <li>Oggetto: “Richiesta ammissione sotto la qualifica di socio”.</li>
                  <li>Inserisci ogni informazione utile da avere, ad esempio il tuo username Telegram.</li>
                  <li>Se ricopri già ruoli in PoliNetwork, specificali.</li>
                </ul>
              )}
              {index === 4 && (
                <p className="typo-body-medium sm:typo-body-large text-pretty">
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
            fill
            sizes="(min-width: 1280px) 40vw, 100vw"
            // Figma's crop keeps the bottom of the photo (the people), whatever the box's aspect ratio
            className="object-cover object-bottom"
          />
        </div>
        <PhotoShapes
          desktop={{
            width: 642,
            height: 312,
            shapes: [
              { variant: "small-blue", x: 593.712, y: 189, w: 312, h: 312, matrix: [0.9403, -0.3404, 0.3404, 0.9403] },
              {
                variant: "small-blue",
                x: -35.053,
                y: 60.843,
                w: 372.538,
                h: 372.538,
                matrix: [0.9403, -0.3404, 0.3404, 0.9403],
              },
              {
                variant: "looper",
                x: 89.691,
                y: 137.058,
                w: 718.112,
                h: 695.96,
                matrix: [0.2588, -0.9659, -0.9659, -0.2588],
              },
            ],
          }}
          mobile={{
            width: 354,
            height: 172,
            shapes: [
              {
                variant: "small-blue",
                x: 313.296,
                y: 140.296,
                w: 148.818,
                h: 148.818,
                matrix: [0.9403, -0.3404, 0.3404, 0.9403],
              },
              {
                variant: "small-blue",
                x: -6.214,
                y: 24.787,
                w: 177.693,
                h: 177.693,
                matrix: [0.9403, -0.3404, 0.3404, 0.9403],
              },
              {
                variant: "looper",
                x: 39.651,
                y: 77.385,
                w: 342.525,
                h: 331.959,
                matrix: [0.2588, -0.9659, -0.9659, -0.2588],
              },
            ],
          }}
        />
      </div>
    </section>
  )
}
