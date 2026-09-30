"use client"
import { useAsyncDebouncer } from "@tanstack/react-pacer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { LiaTelegramPlane } from "react-icons/lia"
import { Input } from "@/components/ui/input"
import { searchGroups } from "@/queries/groups"
import type { ApiOutput } from "@/types"
import { Glass } from "../glass"
import { Spinner } from "../spinner"

const PLATFORM_ICON = { tg: LiaTelegramPlane, wa: FaWhatsapp }
const PLATFORM_LABEL = { tg: "Telegram", wa: "WhatsApp" }

export type SearchGroup = ApiOutput["groups"]["search"]["search"]["groups"][number] & { link: string }

export function GroupSearch({ onSelect }: { onSelect?: (group: SearchGroup) => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ApiOutput["groups"]["search"]["search"] | null>(null)

  const debouncedSearch = useAsyncDebouncer(
    async (searchTerm: string) => {
      const res = await searchGroups(searchTerm, 20)
      setResults(res)
    },
    {
      wait: 500,
    },
    (state) => ({ isLoading: state.isPending || state.isExecuting })
  )

  useEffect(() => {
    setResults(null)
    if (query) debouncedSearch.maybeExecute(query)
  }, [query, debouncedSearch.maybeExecute])

  return (
    <div className="relative w-full max-w-lg">
      <Input
        icon={<FiSearch className="h-5 w-5" />}
        type="text"
        placeholder="Corso, Scuola, Interessi..."
        aria-label="Corso, Scuola, Interessi..."
        containerClassName="w-full"
        className="typo-body-medium"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />

      {query && (
        <Glass className="absolute top-15 z-20 grid w-full overflow-hidden rounded-xl p-0">
          <div className="max-h-70 overflow-y-auto">
            {results && results.count > 0 ? (
              results?.groups
                .filter((g): g is SearchGroup => !!g.link)
                .map((g) => {
                  const Icon = PLATFORM_ICON[g.type]
                  const content = (
                    <div className="flex items-center justify-start gap-3 px-4 py-3 text-start hover:bg-background-blur">
                      <div
                        role="img"
                        aria-label={PLATFORM_LABEL[g.type]}
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#74D4FF]"
                      >
                        <Icon className="size-4.5" />
                      </div>
                      {g.title}
                    </div>
                  )

                  return onSelect ? (
                    <button
                      key={`${g.type}:${g.telegramId}`}
                      type="button"
                      className="w-full"
                      onClick={() => onSelect(g)}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link key={`${g.type}:${g.telegramId}`} href={g.link} target="_blank">
                      {content}
                    </Link>
                  )
                })
            ) : (
              <div className="flex h-12 items-center justify-center px-4">
                {debouncedSearch.state.isLoading ? (
                  <Spinner className="fill-blue-primary text-blue-primary/20" />
                ) : (
                  "No group found"
                )}
              </div>
            )}
          </div>
        </Glass>
      )}
    </div>
  )
}
