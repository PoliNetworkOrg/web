"use client"

import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import { Input } from "@/components/ui/input"
import { contributors } from "./constants"

const categories = ["Tutti", "Direttivi", "Admin", "Collaboratori"]

export function Thanks() {
  const [search, setSearch] = useState("")
  const query = search.trim().toLocaleLowerCase("it")

  return (
    <TextOnlyLayout
      title="Un grazie speciale"
      description={
        <>
          <h3 className="typo-display-small 2xl:typo-display-large bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
            Centinaia di persone, una sola comunità.
          </h3>
          <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small mt-3">
            PoliNetwork esiste grazie a tutte le persone che, in modi diversi, hanno dedicato tempo, energie e idee alla
            sua crescita. Alcune hanno coordinato un corso, altre sviluppato uno strumento, organizzato un evento,
            moderato un gruppo o semplicemente aiutato qualcuno nel momento giusto.
          </p>
          <p className="typo-body-large md:typo-headline-extrasmall xl:typo-headline-small">
            Questa è la nostra memoria collettiva.
          </p>
        </>
      }
      classNames={{
        section: "mx-auto max-w-330 gap-16 px-6 md:px-6 xl:flex-row",
        textDiv: "xl:w-1/2 xl:items-start xl:text-start",
        title: "max-sm:typo-headline-medium xl:text-start",
        descriptionDiv: "xl:text-start",
        contentDiv: "min-w-0 xl:w-1/2",
      }}
    >
      <div className="flex w-full flex-col gap-10">
        <Input
          type="search"
          icon={<FiSearch aria-hidden />}
          placeholder="Cerca per nome"
          aria-label="Cerca nei ringraziamenti"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Tabs defaultValue="Tutti" className="gap-10">
          <TabsNavigation items={categories.map((category) => ({ value: category, label: category }))} />
          {categories.map((category) => {
            const names = contributors.filter(
              (person) =>
                (category === "Tutti" || person.category === category) &&
                person.name.toLocaleLowerCase("it").includes(query)
            )
            return (
              <TabsContent key={category} value={category}>
                <div aria-live="polite" aria-atomic="true">
                  {names.length > 0 ? (
                    <ul className="typo-body-medium grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                      {names.map((person) => (
                        <li key={person.name}>{person.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="typo-body-large text-text-secondary">
                      {query ? "Nessun nome trovato." : "Nessun nome disponibile per questa categoria."}
                    </p>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </TextOnlyLayout>
  )
}
