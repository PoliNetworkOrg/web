export function Hero({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="typo-display-large sm:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent sm:py-14">
        {title}
      </h2>
      <p className="typo-title-large sm:typo-headline-small max-w-2xl text-center">{description}</p>
    </div>
  )
}
