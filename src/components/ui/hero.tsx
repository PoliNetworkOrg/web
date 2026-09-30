export function Hero({
  title,
  description,
  gradientDescription = false,
}: {
  title: string
  description: string
  gradientDescription?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="typo-display-large sm:typo-display-extralarge w-full self-stretch bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-center text-transparent sm:py-14">
        {title}
      </h2>
      <p
        className={
          // background: conic-gradient(from 151deg at 45.23% 50%, var(--color-blue-secondary) 0%, var(--color-text-primary) 50.48%, var(--color-blue-secondary) 96.63%)
          gradientDescription
            ? "typo-title-large sm:typo-display-small max-w-3xl bg-[conic-gradient(from_151deg_at_45.23%_50%,var(--color-blue-secondary)_0%,var(--color-text-primary)_50.48%,var(--color-blue-secondary)_96.63%)] bg-clip-text text-center text-transparent"
            : "typo-title-large sm:typo-headline-small max-w-2xl text-center"
        }
      >
        {description}
      </p>
    </div>
  )
}
