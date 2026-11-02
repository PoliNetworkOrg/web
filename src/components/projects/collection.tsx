"use client"

import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { INLINE_LINK, SECTION_STACK, SECTION_TITLE } from "../layout/page"
import { Input } from "../ui/input"
import { ProjectList, ProjectsEmpty } from "./project-list"
import type { Project } from "./resources"

/** Case- and accent-insensitive, so "universita" finds "Università". */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

/** Lists the collection; a search looks through every project on the page, novelties and deprecated ones included. */
export function Collection({ projects, searchable }: { projects: Project[]; searchable: Project[] }) {
  const [query, setQuery] = useState("")
  const needle = normalize(query.trim())
  const words = needle.split(/\s+/)
  const matches = needle
    ? searchable.filter((project) => {
        const text = normalize(`${project.title} ${project.descriptionIt}`)
        return words.every((word) => text.includes(word))
      })
    : projects

  return (
    <section aria-labelledby="raccolta-title" className={SECTION_STACK}>
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 id="raccolta-title" className={SECTION_TITLE}>
          Esplora la raccolta completa dei progetti
        </h2>
        {projects.length > 0 && (
          <Input
            icon={<FiSearch className="h-5 w-5" />}
            type="search"
            placeholder="Cerca un progetto"
            aria-label="Cerca un progetto per nome o descrizione"
            containerClassName="w-full max-w-xl"
            className="typo-body-medium"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {needle && `${matches.length} progetti trovati`}
      </p>
      <ProjectList
        // Remount on a new search, so the list starts collapsed and the carousel from the first card
        key={needle}
        projects={matches}
        initialCount={needle ? undefined : 8}
        empty={
          <ProjectsEmpty>
            {needle ? (
              <>Nessun progetto corrisponde a “{query.trim()}”.</>
            ) : (
              <>
                La raccolta è vuota per ora.{" "}
                <a href="#proponi" className={INLINE_LINK}>
                  Proponi il primo progetto
                </a>
              </>
            )}
          </ProjectsEmpty>
        }
      />
    </section>
  )
}
