"use client"
import { useAsyncDebouncer } from "@tanstack/react-pacer"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import telegram from "@/assets/icons/telegram-fill.svg"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { searchGroups } from "@/queries/groups"
import type { ApiOutput } from "@/types"
import { Glass } from "../glass"
import { Spinner } from "../spinner"

export function GroupSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ApiOutput["tg"]["groups"]["search"] | null>(null)

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
        placeholder="Find your group"
        aria-label="Find your group"
        containerClassName="w-full"
        className="typo-body-medium"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />

      {query && (
        <Glass className={cn("absolute top-15 grid w-full overflow-hidden rounded-xl p-0")}>
          <div className="max-h-70 overflow-y-auto">
            {results && results.count > 0 ? (
              results?.groups
                .filter((g): g is typeof g & { link: string } => !!g.link)
                .map((g) => (
                  <Link key={g.telegramId} href={g.link} target="_blank">
                    <div className="flex items-center justify-start gap-3 px-4 py-3 text-start hover:bg-background-blur">
                      <Image key="telegram" src={telegram} alt="Telegram" className="size-5" />
                      {g.title}
                    </div>
                  </Link>
                ))
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
