import type { ReactNode } from "react"
import companyImage from "@/assets/images/collabora_company.jpg"
import { PhotoSection } from "./photo-section"
import { Highlight } from "./section"

export function CompanySection({ photoDecorations }: { photoDecorations: ReactNode }) {
  return (
    <PhotoSection
      title="Sei un’azienda?"
      image={companyImage}
      frameClassName="aspect-[354/209] md:aspect-[611/366]"
      imageClassName="top-[-8.25%] left-[-5.78%] h-[117.41%] w-[105.65%] md:top-[-3.11%] md:left-0 md:h-[111.16%] md:w-[100.03%]"
      decorations={photoDecorations}
      photoFirst
      className="py-30 md:py-31.25"
    >
      <p>
        PoliNetwork è un punto di accesso diretto alla community studentesca del Politecnico di Milano: migliaia di
        studenti di corsi tecnici e progettuali, da tutta Italia, in tutti gli anni di corso. Se hai{" "}
        <Highlight>un'iniziativa che porta valore reale agli studenti</Highlight>, siamo disponibili a valutarla.
      </p>
      <p>
        Siamo aperti a proposte su <Highlight>eventi, iniziative di recruiting o progetti di visibilità</Highlight>.
        Ogni proposta viene discussa nel rispetto della nostra indipendenza: non facciamo cose che compromettono la
        fiducia che gli studenti ripongono in noi.
      </p>
    </PhotoSection>
  )
}
