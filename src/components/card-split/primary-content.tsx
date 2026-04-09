export function CardSplitPrimaryContent({ text }: { text: string }) {
  return (
    <p className="typo-display-medium bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text font-normal text-transparent">
      {text}
    </p>
  )
}
