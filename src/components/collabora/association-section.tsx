import type { ReactNode } from "react"
import associationsImage from "@/assets/images/collabora_associations.jpg"
import { PhotoSection } from "./photo-section"
import { Highlight } from "./section"

export function AssociationSection({ photoDecorations }: { photoDecorations: ReactNode }) {
  return (
    <PhotoSection
      title={
        <>
          {/* The 402px Figma frame shortens the title to fit one line */}
          <span className="md:hidden">Sei un’associazione?</span>
          <span className="max-md:hidden">Sei un’associazione studentesca?</span>
        </>
      }
      image={associationsImage}
      frameClassName="aspect-[354/210] md:aspect-[611/370]"
      imageClassName="top-0 left-[-0.14%] h-[112.55%] w-[100.14%] md:top-[-10.27%] md:left-[-0.08%] md:h-[110.27%] md:w-[100.15%]"
      decorations={photoDecorations}
      className="py-30 md:py-37.5"
    >
      <p>
        Se fai parte dell'ecosistema universitario del Politecnico di Milano o di un'altra università, possiamo valutare
        collaborazioni su{" "}
        <Highlight>eventi congiunti, visibilità reciproca sui canali o iniziative rivolte agli studenti</Highlight>.
      </p>
      <p>
        Le collaborazioni più efficaci che abbiamo avuto nel tempo sono nate da gruppi studenteschi che condividevano
        <br className="hidden min-[1728px]:inline" /> una parte degli obiettivi che perseguiamo:{" "}
        <Highlight>
          rendere la vita universitaria meno complicata e più ricca per chi studia
          <br className="hidden min-[1728px]:inline" /> al Politecnico.
        </Highlight>
      </p>
    </PhotoSection>
  )
}
