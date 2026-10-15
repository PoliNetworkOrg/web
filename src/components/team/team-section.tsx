import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { applicationHref, type Team } from "./constants"
import { PeopleGallery } from "./people-gallery"

export function TeamSection({ team }: { team: Team }) {
  return (
    <section
      id={team.id}
      aria-labelledby={`${team.id}-title`}
      className="mx-auto flex w-full max-w-360 scroll-mt-36 flex-col gap-10 px-6 md:gap-12"
    >
      <div
        className={cn("grid min-w-0 items-center gap-10 xl:grid-cols-2 xl:gap-16", team.centered && "xl:grid-cols-1")}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col items-center gap-6 text-center xl:items-start xl:text-start",
            team.reverse && "xl:order-last",
            team.centered && "mx-auto max-w-240 xl:items-center xl:text-center"
          )}
        >
          <h2
            id={`${team.id}-title`}
            className="typo-headline-medium md:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            {team.title}
          </h2>
          <p className="typo-body-large md:typo-headline-small text-pretty">{team.description}</p>
          <Button asChild size="lg" className="mt-2 w-fit">
            <a href={applicationHref(team.title)}>
              Unisciti a noi <FiUsers aria-hidden />
            </a>
          </Button>
        </div>
        {team.roles.length > 0 && (
          <div
            className={cn(
              "grid w-full min-w-0 gap-4 sm:grid-cols-2",
              team.id === "it" && "sm:grid-cols-6",
              team.centered && "sm:grid-cols-3"
            )}
          >
            {team.roles.map((role, index) => (
              <Card
                key={role.title}
                className={cn(
                  "h-auto w-full p-4 sm:p-6",
                  team.id === "it" && "sm:col-span-2",
                  team.id === "it" && index === 3 && "sm:col-start-2"
                )}
              >
                <CardHeader className="flex h-full flex-row items-center justify-between gap-4 sm:flex-col-reverse sm:justify-center sm:gap-6">
                  <CardTitle className="typo-body-large sm:typo-title-large min-w-0 text-balance sm:text-center">
                    {role.title}
                  </CardTitle>
                  {typeof role.icon === "string" ? (
                    <Image
                      src={role.icon}
                      alt=""
                      width={88.4252}
                      height={88.4252}
                      className="size-6 shrink-0 sm:size-12"
                    />
                  ) : (
                    <GradientIcon icon={role.icon} className="size-6 shrink-0 sm:size-12" />
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
      {team.placeholderCount > 0 && <PeopleGallery placeholderCount={team.placeholderCount} />}
    </section>
  )
}
