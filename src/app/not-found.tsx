import Link from "next/link"

export default async function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 font-bold text-3xl text-accent-foreground">Not Found</h2>

      <p className="mb-4">This page doesn't exist or is not available yet.</p>

      <Link href="/">Go to homepage</Link>
    </main>
  )
}
