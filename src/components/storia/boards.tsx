"use client"

import { Glass } from "@/components/glass"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
import { InOfficeBadge } from "@/components/people/in-office-badge"
import { Roster } from "@/components/people/roster"
import { BoardMemberCard } from "@/components/structure/board-member-card"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import { currentBoard, formatPeriod, pastBoards } from "@/lib/people"
import { boardMembers } from "./constants"

/** The boards in order, the one in office last: its tab opens first */
const boards = [...pastBoards, currentBoard]
const CURRENT = currentBoard.title ?? ""

export function Boards() {
  return (
    <section id="direttivi" className={`${CONTAINER} flex scroll-mt-36 flex-col gap-8 md:gap-10`}>
      <h2 className={SECTION_TITLE}>Ogni mandato, un nuovo capitolo</h2>
      <Tabs defaultValue={CURRENT} className="gap-12">
        <TabsNavigation items={boards.map((board) => ({ value: board.title ?? "", label: board.title ?? "" }))} />
        {boards.map((board) => (
          <TabsContent key={board.title} value={board.title ?? ""}>
            {board.current ? (
              <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
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
                {/* How the board is chosen sits in the text beside the portraits, not as a caption under them */}
                <div className="order-first flex flex-col gap-4 xl:order-last xl:pt-2">
                  <h3 className="typo-display-small text-balance">Il Direttivo</h3>
                  <p className="typo-body-large flex flex-wrap items-center gap-x-3 gap-y-1 text-text-secondary">
                    {formatPeriod(board)} <InOfficeBadge />
                  </p>
                  <p className="typo-body-large text-pretty">
                    Si concentra sul rafforzamento della struttura, sull’evoluzione dei servizi e sullo sviluppo di
                    nuovi progetti per la community.
                  </p>
                  <p className="typo-body-large text-pretty">
                    Viene eletto <span className="text-blue-secondary">ogni due anni</span> dall’Assemblea dei Soci, tra
                    i soci dell’associazione.
                  </p>
                </div>
              </div>
            ) : (
              <Glass className="flex flex-col gap-6 rounded-rectangles border-white/50 bg-background-blur p-6 sm:p-8">
                <div className="flex flex-col gap-2">
                  <h3 className="typo-headline-small">{board.title}</h3>
                  <p className="typo-body-large text-text-secondary">{formatPeriod(board)}</p>
                </div>
                <Roster people={board.people} />
              </Glass>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
