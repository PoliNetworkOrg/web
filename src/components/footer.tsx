import { Glass } from "./glass"

export function Footer() {
  return (
    <footer className="items-center w-full px-8 my-8">
      <h2 className="text-2xl text-center">Keep in touch!</h2>
      <div id="talkwithus" className="my-8">
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

      <div id="interested" className="text-center my-8">
        <h3 className="text-xl font-bold">Sei interessato?</h3>
      </div>

      <div id="problems" className="text-center my-8">
        <h3 className="text-xl font-bold">Qualche problema? Segnalalo!</h3>
      </div>

      <Glass id="donation" className="w-64 mx-auto my-8 flex justify-around items-center">
        <p className="text-xl">5x1000</p>
        <div className="flex flex-col text-sm">
          <p className="font-bold">Sostienici!</p>
          <p>CF: 97927490157</p>
        </div>
      </Glass>

      <div id="sitemap">
        <h3 className="text-xl font-bold mt-8 mb-4">Visita il sito</h3>
        <div className="grid grid-cols-2 text-gray-600 text-sm gap-2">
          <p>Resources</p>
          <p>Privacy Policy</p>
          <p>Community</p>
          <p>Terms & conditions</p>
          <p>About</p>
          <p>Cookie policy</p>
        </div>
      </div>

      <div id="copyright" className="text-center text-xs text-gray-600 mt-12">
        PoliNetwork 2016-2025 - All rights reserved
      </div>
    </footer>
  )
}
