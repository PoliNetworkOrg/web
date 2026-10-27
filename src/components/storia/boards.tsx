"use client"

import { CONTAINER } from "@/components/layout/page"
import { BoardMemberCard } from "@/components/structure/board-member-card"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import { boardMembers, boardTerms } from "./constants"

export function Boards() {
  return (
    <section id="direttivi" className={`${CONTAINER} flex scroll-mt-36 flex-col gap-6`}>
      <h2 className="typo-title-large text-blue-secondary">I nostri direttivi</h2>
      <p className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        Ogni mandato, un nuovo capitolo
      </p>
      <Tabs defaultValue="2024-OGGI" className="mt-2 gap-12">
        <TabsNavigation items={boardTerms.map((term) => ({ value: term, label: term }))} />
        {boardTerms.map((term) => (
          <TabsContent key={term} value={term}>
            {term === "2024-OGGI" ? (
              <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
                <div className="flex flex-col items-center gap-8">
                  <div className="flex w-full flex-wrap justify-center gap-6">
                    {boardMembers.map((member) => (
                      <BoardMemberCard
                        key={member.name}
                        member={member}
                        sizes="(max-width: 639px) 45vw, (max-width: 1279px) 30vw, 224px"
                        className="sm:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)] min-[360px]:w-[calc((100%-24px)/2)]"
                      />
                    ))}
                  </div>
                  <p className="typo-label-large max-w-145 text-center text-text-secondary">
                    Il Direttivo viene eletto ogni due anni dall’Assemblea dei Soci tra i soci dell’associazione.
                  </p>
                </div>
                <div className="order-first flex flex-col gap-4 xl:order-last xl:pt-2">
                  <p className="typo-label-large text-blue-secondary">{term}</p>
                  <h3 className="typo-display-small text-balance">Il Direttivo</h3>
                  <p className="typo-body-large text-pretty">
                    Si concentra sul rafforzamento della struttura, sull’evoluzione dei servizi e sullo sviluppo di
                    nuovi progetti per la community.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-70 flex-col items-center justify-center gap-4 text-center">
                <h3 className="typo-headline-medium">{term}</h3>
                <p className="typo-body-large text-text-secondary">
                  La composizione di questo mandato non è ancora disponibile.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
