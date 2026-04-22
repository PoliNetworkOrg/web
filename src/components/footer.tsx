import { ChevronDown, Github } from "lucide-react"
import { CardSplit } from "./card-split"
import { Button } from "./ui/button"
import { ButtonWithIcon } from "./ui/buttonWithIcon"

export function Footer() {
  //Icone a riga 11 in futuro per mobile
  return (
    <footer className="my-8 w-full px-8">
      <h2 className="typo-headline-medium md:typo-display-large mb-8 text-center max-md:bg-linear-to-b max-md:from-blue-secondary max-md:to-blue-primary max-md:bg-clip-text max-md:text-transparent">
        Keep in touch!
      </h2>
      <div className="flex w-full justify-evenly gap-8 max-md:flex-col max-md:items-center">
        <div className="flex w-full flex-col gap-8 md:order-2 md:max-w-sm">
          <div id="talkwithus" className="w-full">
            <h3 className="typo-label-extralarge md:typo-headline-small">Talk with us</h3>
            <div id="emails" className="typo-body-medium md:typo-body-large">
              <div id="collabs" className="my-4">
                <p className="text-gray-600">Per collaborazioni ed eventi</p>
                <a href="mailto:eventi@polinetwork.org">eventi@polinetwork.org</a>
              </div>
              <div id="requests">
                <p className="text-gray-600">Per domande e richieste</p>
                <a href="mailto:direttivo@polinetwork.org">direttivo@polinetwork.org</a>
              </div>
            </div>
          </div>

          <div id="interested" className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="typo-label-extralarge md:typo-headline-small">Sei interessato?</h3>
            <div>
              <Button variant="primary" size="lg" className="typo-label-large">
                Unisciti a noi!
              </Button>
            </div>
          </div>

          <div id="problems" className="flex flex-col gap-4 text-center md:text-left">
            <h3 className="typo-label-extralarge md:typo-headline-small">Qualche problema? Segnalalo!</h3>
            <div>
              <ButtonWithIcon icon={Github} iconPosition="left" variant="tertiary" text="Report a bug"></ButtonWithIcon>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 max-md:w-full md:max-w-md md:justify-self-end">
          <CardSplit
            className="md:order-2"
            textPrimary="5x1000"
            textSecondary="Sostienici!"
            textSecondarySmall="CF: 97927490157"
          />

          <div id="sitemap" className="flex w-full flex-col gap-4">
            <h3 className="typo-label-extralarge md:typo-headline-small">Visita il sito</h3>
            <div className="typo-body-large grid grid-cols-2 items-start gap-x-4 gap-y-4 text-gray-600">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                  Resources
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-2 text-gray-500 text-sm">
                  <a href="/" className="hover:text-gray-800">
                    Rules
                  </a>
                  <a href="/" className="hover:text-gray-800">
                    Guides
                  </a>
                  <a href="/" className="hover:text-gray-800">
                    FAQ
                  </a>
                </div>
              </details>
              <p>Privacy Policy</p>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                  Community
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-2 text-gray-500 text-sm">
                  <a href="/" className="hover:text-gray-800">
                    Discord
                  </a>
                  <a href="/" className="hover:text-gray-800">
                    Telegram
                  </a>
                </div>
              </details>
              <p>Terms & conditions</p>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                  About
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-2 text-gray-500 text-sm">
                  <a href="/" className="hover:text-gray-800">
                    Team
                  </a>
                  <a href="/" className="hover:text-gray-800">
                    Contatti
                  </a>
                </div>
              </details>
              <p>Cookie policy</p>
            </div>
          </div>
        </div>
      </div>

      <div id="copyright" className="typo-body-small md:typo-body-large mt-12 text-center text-gray-600 md:text-left">
        PoliNetwork 2016-2026 © All rights reserved
      </div>
    </footer>
    //TODO: dropdowns
  )
}
