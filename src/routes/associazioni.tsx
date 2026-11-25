import { createFileRoute } from "@tanstack/react-router"
import { AssociationFilters } from "@/components/associations/association-filters"
import { AssociationsList } from "@/components/associations/associations-list"
import { UpcomingEvents } from "@/components/associations/upcoming-events"
import { CONTAINER, EMPTY_STATE, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta } from "@/lib/seo"
import { fetchAssociationsPage } from "@/queries/functions"

/** A filter as the URL has it: the first value when repeated, nothing when empty */
const single = (value: unknown) => {
  const first = Array.isArray(value) ? value[0] : value
  return first === undefined || first === null || first === "" ? undefined : String(first)
}

export const Route = createFileRoute("/associazioni")({
  // The filters live in the URL (`?corso=…&sede=…`) and are applied on the server. Read as they are: validating the
  // search would make the router redirect any URL it would write differently
  loaderDeps: ({ search }: { search: { corso?: unknown; sede?: unknown } }) => ({
    programme: single(search.corso),
    campus: single(search.sede),
  }),
  loader: ({ deps }) => fetchAssociationsPage({ data: deps }),
  head: () => ({
    meta: pageMeta({ title: "Associazioni", description: "Scopri le associazioni studentesche del Politecnico" }),
  }),
  component: AssociationsPage,
})

function AssociationsPage() {
  const { total, shown, options, events, portalUrl } = Route.useLoaderData()
  const { associazione }: { associazione?: unknown } = Route.useSearch()

  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Associazioni" description="Scopri le associazioni studentesche del Politecnico" />
      </section>

      {events.length > 0 && (
        <section aria-labelledby="prossimi-eventi" className={CONTAINER}>
          <div className="mx-auto mb-12 w-full max-w-300">
            <h2 id="prossimi-eventi" className="typo-headline-small mb-6">
              Prossimi eventi
            </h2>
            <UpcomingEvents events={events} />
          </div>
        </section>
      )}

      {/* Figma's list column: 1200px at 1728 */}
      <section aria-label="Elenco delle associazioni" className={CONTAINER}>
        <div className="mx-auto w-full max-w-300">
          {(options.programmes.length > 0 || options.campuses.length > 0) && (
            <div className="mb-8">
              <AssociationFilters programmes={options.programmes} campuses={options.campuses} />
            </div>
          )}
          {total > 0 && shown.length === 0 ? (
            <p className={EMPTY_STATE}>
              Nessuna associazione corrisponde ai filtri. Le associazioni trasversali compaiono per ogni corso.
            </p>
          ) : (
            <AssociationsList associations={shown} openId={single(associazione)} />
          )}
          <p className="mt-10 text-center">
            Rappresenti un’associazione?{" "}
            <a className="underline underline-offset-4" href={portalUrl}>
              Registrala o richiedi accesso alla sua scheda
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
