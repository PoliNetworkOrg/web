"use client"

import Image from "next/image"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { boardMembers, boardTerms } from "./constants"

export function Boards() {
  return (
    <section className="mx-auto flex w-full max-w-330 flex-col gap-6 px-6">
      <h2 className="typo-headline-medium md:typo-display-medium">I nostri direttivi</h2>
      <p className="typo-display-small 2xl:typo-display-large bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
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
                      <Card
                        key={member.name}
                        className="relative aspect-[223.429/263] h-auto w-full max-w-56 rounded-rectangles border-0 p-0 sm:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)] min-[360px]:w-[calc((100%-24px)/2)]"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          sizes="(max-width: 639px) 45vw, (max-width: 1279px) 30vw, 224px"
                          className={cn("absolute max-w-none", member.crop)}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-linear-to-t from-5% from-blue-secondary/70 to-60% to-transparent"
                        />
                        <CardContent className="absolute inset-x-4 bottom-5 text-white">
                          <h3 className="typo-body-large font-poppins">{member.name}</h3>
                          {member.role && (
                            <p className="typo-body-small sm:typo-label-tiny sm:font-normal">{member.role}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p className="typo-label-large max-w-145 text-center text-text-secondary">
                    Il Direttivo viene eletto ogni due anni dall’Assemblea dei Soci tra i soci dell’associazione.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="typo-headline-small text-text-secondary">{term}</p>
                  <h3 className="typo-display-medium">Il Direttivo</h3>
                  <p className="typo-body-medium">
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
