export function VisionSection() {
  return (
    <section className="page-container flex flex-col gap-6 pt-page-top text-center md:text-start">
      <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        La nostra visione
      </h2>
      <p className="typo-display-small md:typo-display-large bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent md:max-w-304">
        Un Politecnico in cui nessuno studente resti indietro per mancanza di{" "}
        <span className="text-blue-secondary">informazioni.</span>
      </p>
      <p className="typo-body-large md:typo-headline-small">
        Rendiamo le informazioni sul PoliMi più accessibili, comprensibili e facili da trovare.
      </p>
    </section>
  )
}
