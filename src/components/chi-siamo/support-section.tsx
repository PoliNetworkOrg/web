export function SupportSection() {
  return (
    <section className="page-container grid gap-section md:grid-cols-2 md:gap-block">
      <div className="flex flex-col gap-6 text-center md:text-start">
        <h2 className="typo-display-medium md:typo-display-large text-blue-secondary">
          Sostieni
          <br />
          PoliNetwork
        </h2>
        <p className="typo-body-large md:typo-headline-small">
          Se vuoi supportare PoliNetwork economicamente, puoi destinarci il 5x1000 nella dichiarazione dei redditi. Si
          tratta di una quota IRPEF che verseresti comunque, e che puoi scegliere di indirizzare a noi senza alcun costo
          aggiuntivo.
        </p>
      </div>

      <div className="flex flex-col gap-6 text-center md:text-start">
        <h2 className="typo-headline-medium md:typo-display-medium">
          Il tuo <span className="typo-display-medium md:typo-display-large text-blue-secondary">5x1000</span>
          <br />
          può fare la differenza
        </h2>
        <p className="typo-body-large md:typo-headline-small">
          Nella sezione dedicata agli Enti del Terzo Settore, indica il nostro codice fiscale:
          <br />
          <span className="text-blue-secondary">97927490157</span>
        </p>
      </div>
    </section>
  )
}
