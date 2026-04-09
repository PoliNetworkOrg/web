import type { CardListSection } from "./types"

export function CardListSectionContent({ title, paragraphs }: CardListSection) {
  return (
    <div className="flex flex-col gap-6 pt-1.5 pl-3">
      {title && (
        <h3 className="typo-headline-small bg-linear-to-t from-blue-primary to-blue-secondary bg-clip-text text-transparent">
          {title}
        </h3>
      )}

      <div className="flex flex-col gap-4 pl-2">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="typo-body-large max-w-4xl whitespace-pre-line text-text-primary">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
