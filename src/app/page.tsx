import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 text-3xl font-bold text-accent-foreground">Welcome to PoliNetwork</h2>
      <p className="mb-4">
        PoliNetwork is a student association dedicated to connecting and supporting students at Politecnico.
      </p>
      <Link href="/about">
        <Button>About</Button>
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add more content sections here */}
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>To foster a collaborative and supportive community among Politecnico students.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Stay tuned for our exciting events and workshops!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Get Involved</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Join our community and make a difference in student life at Politecnico.</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
