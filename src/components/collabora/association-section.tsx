import Image from "next/image"
import associationsImage from "@/assets/images/collabora_associations.jpg"

export function AssociationSection() {
  return (
    <section className="flex w-full flex-row items-end gap-27 px-36">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="typo-display-large sm:typo-display-medium text-start">Sei un’associazione studentesca?</h2>

        <div className="flex flex-col gap-3 text-start">
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

      <div className="flex flex-1 items-center justify-center">
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
