import Image from "next/image"
import companyImage from "@/assets/images/collabora_company.png"

export function CompanySection() {
  return (
    <section className="flex w-full flex-col-reverse items-center gap-27 px-6 text-center min-[1616px]:flex-row min-[1616px]:items-end min-[1616px]:px-36">
      <div className="flex w-full min-w-0 flex-1 items-center justify-center min-[1616px]:min-w-152.75">
        <Image
          src={companyImage}
          alt=""
          width={611}
          height={298}
          style={{ aspectRatio: "611 / 298" }}
          className="h-auto w-full max-w-152.75 rounded-rectangles object-cover"
        />
      </div>

      <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-6 min-[1616px]:items-start min-[1616px]:text-start">
        <h2 className="sm:typo-display-medium typo-headline-medium text-center min-[1616px]:text-start">
          Sei un’azienda?
        </h2>

        <div className="sm:typo-headline-small typo-body-large flex flex-col gap-3 text-center min-[1616px]:text-start">
          <p>
            PoliNetwork è un punto di accesso diretto alla community studentesca del Politecnico di Milano: migliaia di
            studenti di corsi tecnici e progettuali, da tutta Italia, in tutti gli anni di corso. Se hai
            <span className="text-blue-secondary"> un'iniziativa che porta valore reale agli studenti</span>, siamo
            disponibili a valutarla.
          </p>
          <p>
            Siamo aperti a proposte su
            <span className="text-blue-secondary"> eventi, iniziative di recruiting o progetti di visibilità</span>.
            Ogni proposta viene discussa nel rispetto della nostra indipendenza: non facciamo cose che compromettono la
            fiducia che gli studenti ripongono in noi.
          </p>
        </div>
      </div>
    </section>
  )
}
