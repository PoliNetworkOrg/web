import { FiUsers } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { OrganizationChart } from "@/components/storia/organization"

export function OrganizationSection() {
  return (
    <section
      aria-label="Organigramma di PoliNetwork"
      className="mx-auto flex w-full max-w-330 flex-col items-center gap-10 px-6"
    >
      <div className="w-full md:max-w-220">
        <OrganizationChart />
      </div>
      <Glass className="flex w-full flex-col gap-4 rounded-rectangles border-white/50 bg-background-blur p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 gap-4 sm:gap-6">
          <GradientIcon icon={FiUsers} className="size-12 shrink-0 sm:size-16" />
          <div className="flex flex-col gap-3">
            <h2 className="typo-headline-medium">Soci</h2>
            <p className="typo-body-large sm:typo-label-extralarge max-w-196 text-pretty">
              Essere socio è una condizione trasversale, compatibile con qualsiasi ruolo all’interno di PoliNetwork.
              Ogni persona può ricoprire più ruoli contemporaneamente.
            </p>
          </div>
        </div>
        <span className="typo-body-medium w-fit shrink-0 rounded-buttonsM bg-blue-tertiary-blur px-4 py-2">
          Ruolo trasversale
        </span>
      </Glass>
    </section>
  )
}
