import companyImage from "@/assets/images/collabora_company.jpg"
import { PhotoShapes } from "@/components/shapes"
import { PhotoSection } from "./photo-section"
import { Highlight } from "./section"

export function CompanySection() {
  return (
    <PhotoSection
      title="Sei un’azienda?"
      image={companyImage}
      frameClassName="aspect-[354/209] md:aspect-[611/366]"
      imageClassName="top-[-8.25%] left-[-5.78%] h-[117.41%] w-[105.65%] md:top-[-3.11%] md:left-0 md:h-[111.16%] md:w-[100.03%]"
      decorations={
        <PhotoShapes
          desktop={{
            width: 611,
            height: 366,
            shapes: [
              { variant: "small-blue", x: 565, y: 322, w: 248, h: 248 },
              { variant: "big-teal", x: -61, y: 119, w: 684, h: 684 },
              { variant: "looper", x: 324.5, y: 261.6, w: 750, h: 727.4, matrix: [0.5, -0.866, 0.866, 0.5] },
            ],
          }}
          mobile={{
            width: 354,
            height: 209,
            shapes: [
              { variant: "small-blue", x: 332.2, y: 159.9, w: 148.4, h: 148.4 },
              { variant: "big-teal", x: -42.4, y: -39.4, w: 409.3, h: 409.3 },
              { variant: "looper", x: 188.3, y: 123.8, w: 448.8, h: 435.3, matrix: [0.5, -0.866, 0.866, 0.5] },
            ],
          }}
        />
      }
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
