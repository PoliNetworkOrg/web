export function CollaborationSection() {
  return (
    <section className="flex w-full flex-row gap-8 px-36">
      <div className="flex max-w-[959] flex-col gap-6">
        <h2 className="typo-display-large sm:typo-display-medium text-start">Cosa possiamo fare insieme?</h2>

        <div className="flex flex-col gap-3 text-start">
          <p className="typo-title-large sm:typo-headline-small">
            Collaborare con noi significa{" "}
            <span className="text-blue-primary">accedere a questa community in modo diretto</span>. Non siamo un canale
            pubblicitario e non accettiamo promozioni commerciali generiche: ogni collaborazione viene valutata in
            termini di valore concreto per gli studenti del Politecnico
            <span className="typo-headline-extrasmall">
              {" "}
              (e nel rispetto dei nostri valori sanciti sul nostro statuto).
            </span>
          </p>
          <p className="typo-title-large sm:typo-headline-small">
            Se il progetto ha senso per la nostra community, siamo disponibili a costruirlo insieme!
          </p>
        </div>
      </div>

      {/* Placeholder */}
      <div></div>
    </section>
  )
}
