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
      <h2 className="typo-display-large sm:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent sm:py-14">
        {title}
      </h2>
      <p
        className={
          gradientDescription
            ? "typo-title-large sm:typo-display-small max-w-3xl bg-[conic-gradient(from_151deg,var(--color-text-primary),var(--color-blue-secondary))] bg-clip-text text-center text-transparent"
            : "typo-title-large sm:typo-headline-small max-w-2xl text-center"
        }
      >
        {description}
      </p>
    </div>
  )
}
