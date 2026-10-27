import associationsImage from "@/assets/images/collabora_associations.jpg"
import { PhotoShapes } from "@/components/shapes"
import { PhotoSection } from "./photo-section"
import { Highlight } from "./section"

export function AssociationSection() {
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
      decorations={
        <PhotoShapes
          desktop={{
            width: 611,
            height: 370,
            shapes: [
              { variant: "small-blue", x: 63.5, y: 246.5, w: 295, h: 295 },
              { variant: "big-teal", x: 620, y: -33, w: 684, h: 684 },
              { variant: "small-blue", x: 600.5, y: -36.5, w: 199, h: 199 },
              { variant: "looper", x: 654.5, y: 69.5, w: 813, h: 787 },
            ],
          }}
          mobile={{
            width: 354,
            height: 210,
            shapes: [
              { variant: "small-blue", x: 15.5, y: 197, w: 163, h: 164 },
              { variant: "big-teal", x: 323, y: -13.5, w: 378, h: 379 },
              { variant: "looper", x: 342.5, y: 43.5, w: 449, h: 435 },
            ],
          }}
        />
      }
    >
      <p>
        Se fai parte dell'ecosistema universitario del Politecnico di Milano o di un'altra università, possiamo valutare
        collaborazioni su{" "}
        <Highlight>eventi congiunti, visibilità reciproca sui canali o iniziative rivolte agli studenti</Highlight>.
      </p>
      <p>
        Le collaborazioni più efficaci che abbiamo avuto nel tempo sono nate da gruppi studenteschi che condividevano
        una parte degli obiettivi che perseguiamo:{" "}
        <Highlight>rendere la vita universitaria meno complicata e più ricca per chi studia al Politecnico.</Highlight>
      </p>
    </PhotoSection>
  )
}
