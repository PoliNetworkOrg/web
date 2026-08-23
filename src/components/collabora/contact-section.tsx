export function ContactSection() {
  return (
    <section className="flex w-full flex-col gap-6 px-36">
      <h2 className="typo-display-large sm:typo-display-medium text-start">Come contattarci</h2>

      <div className="flex flex-col gap-3 text-start">
        <p className="typo-title-large sm:typo-headline-small">
          Per proporre una collaborazione, scrivi a{" "}
          <a href="mailto:events@polinetwork.org" className="text-blue-secondary">
            events@polinetwork.org
          </a>
        </p>
        <p className="typo title-large sm:typo-headline-small max-w-3xl">
          Descrivi chi sei, cosa vorresti fare e{" "}
          <span className="text-blue-secondary">
            perché pensi che sia una buona idea per gli studenti del Politecnico.
          </span>
        </p>
        <p className="typo-title-large sm:typo-headline-small">Rispondiamo a tutte le richieste!</p>
      </div>
    </section>
  )
}
