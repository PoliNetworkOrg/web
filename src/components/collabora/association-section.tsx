import Image from "next/image"
import associationsImage from "@/assets/images/collabora_associations.jpg"

export function AssociationSection() {
  return (
    <section className="flex w-full flex-col items-center gap-27 px-6 text-center min-[1616px]:flex-row min-[1616px]:items-end min-[1616px]:px-36">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-6 min-[1616px]:items-start min-[1616px]:text-start">
        <h2 className="typo-display-large sm:typo-display-medium text-center min-[1616px]:text-start">
          Sei un’associazione studentesca?
        </h2>

        <div className="flex flex-col gap-3 text-center min-[1616px]:text-start">
          <p className="typo-title-large sm:typo-headline-small">
            Se fai parte dell'ecosistema universitario del Politecnico di Milano o di un'altra università, possiamo
            valutare collaborazioni su
            <span className="text-blue-secondary">
              {" "}
              eventi congiunti, visibilità reciproca sui canali o iniziative rivolte agli studenti.
            </span>
          </p>
          <p className="typo-title-large sm:typo-headline-small">
            Le collaborazioni più efficaci che abbiamo avuto nel tempo sono nate da gruppi studenteschi che
            condividevano una parte degli obiettivi che perseguiamo:
            <span className="text-blue-secondary">
              {" "}
              rendere la vita universitaria meno complicata e più ricca per chi studia al Politecnico.
            </span>
          </p>
          <p className="typo-title-large sm:typo-headline-small">
            Il processo è semplice: ci scrivi, ci descrivi il progetto e valutiamo insieme se c'è una base comune (per
            poi mettere i nostri talent a disposizione di questa partnership).
          </p>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-1 items-center justify-center min-[1616px]:min-w-[611px]">
        <Image
          src={associationsImage}
          alt=""
          width={611}
          height={408}
          className="h-auto w-full max-w-152.75 rounded-rectangles object-cover"
        />
      </div>
    </section>
  )
}
