import type { ReactNode } from "react"
import { FiMail } from "react-icons/fi"
import { CardCaption } from "@/components/card-caption"

export type ContactCardData = {
  title: string
  description: ReactNode
  email: string
}

/**
 * A way to reach us: the whole card writes to the address, with the hover and press of the site's other clickable
 * cards. The address sits at the bottom in blue, not on a button.
 */
export function ContactCard({ title, description, email }: ContactCardData) {
  return (
    <CardCaption
      title={title}
      caption={<p>{description}</p>}
      href={`mailto:${email}`}
      className="h-full w-full gap-4 p-6"
      titleClassName="typo-headline-small xl:typo-headline-extrasmall text-balance"
      captionClassName="typo-body-medium text-pretty"
      footer={
        <span className="typo-label-large flex min-w-0 items-center gap-2 pt-2 text-blue-secondary">
          <FiMail aria-hidden className="size-4 shrink-0" />
          <span className="truncate">{email}</span>
        </span>
      }
    />
  )
}
