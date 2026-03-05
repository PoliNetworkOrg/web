import { Github } from "lucide-react"
import { Glass } from "./glass"
import { Button } from "./ui/button"
import { ButtonWithIcon } from "./ui/buttonWithIcon"

export function Footer() {
  //Icone a riga 11 in futuro per mobile
  return (
    <footer className="items-center w-full px-8 my-8">
      <h2 className="text-3xl font-bold text-center mb-8">Keep in touch!</h2>
      <div className="flex max-md:flex-col gap-8 max-md:items-center justify-evenly">
        <div className="flex flex-col gap-8 md:order-2 max-w-sm">
          <div id="talkwithus" className="w-full">
            <h3 className="text-xl font-bold">Talk with us</h3>
            <div id="emails">
              <div id="collabs" className="my-4">
                <p className="text-md text-gray-600">Per collaborazioni ed eventi</p>
                <a href="mailto:eventi@polinetwork.org" className="text-sm">
                  eventi@polinetwork.org
                </a>
              </div>
              <div id="requests">
                <p className="text-md text-gray-600">Per domande e richieste</p>
                <a href="mailto:direttivo@polinetwork.org" className="text-sm">
                  direttivo@polinetwork.org
                </a>
              </div>
            </div>
          </div>

          <div id="interested" className="text-center md:text-left flex flex-col gap-4">
            <h3 className="text-xl font-bold">Sei interessato?</h3>
            <div>
              <Button variant="primary" size="lg">
                Unisciti a noi!
              </Button>
            </div>
          </div>

          <div id="problems" className="text-center md:text-left flex flex-col gap-4">
            <h3 className="text-xl font-bold">Qualche problema? Segnalalo!</h3>
            <div>
              <ButtonWithIcon icon={Github} iconPosition="left" variant="tertiary" text="Report a bug"></ButtonWithIcon>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 max-w-sm md:justify-self-end">
          <Glass id="donation" className="w-3xs max-md:mx-auto flex justify-around items-center gap-4 md:order-2">
            <p className="text-xl">5x1000</p>
            <div className="flex flex-col text-sm">
              <p className="font-bold">Sostienici!</p>
              <p className="whitespace-nowrap">CF: 97927490157</p>
            </div>
          </Glass>

          <div id="sitemap" className="w-full flex flex-col gap-4">
            <h3 className="text-xl font-bold">Visita il sito</h3>
            <div className="grid grid-cols-2 text-gray-600 text-sm gap-2">
              <p>Resources</p>
              <p>Privacy Policy</p>
              <p>Community</p>
              <p>Terms & conditions</p>
              <p>About</p>
              <p>Cookie policy</p>
            </div>
          </div>
        </div>
      </div>

      <div id="copyright" className="text-center md:text-left text-xs text-gray-600 mt-12">
        PoliNetwork 2016-2025 - All rights reserved
      </div>
    </footer>
  )
}
