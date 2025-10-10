import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AboutPage() {
  return (
    <main className="mx-auto w-auto px-4 py-8">
      <h2 className="mb-4 text-center text-3xl font-bold text-accent-foreground">About us</h2>
      <div className="grid max-w-[60rem] gap-y-4 text-justify">
        <p>
          The PoliNetwork association is a non-profit organization that was formed with the intention of pursuing a
          series of specific objectives. The mission of the association can be fully understood by referring to the
          statute, which represents the main document that describes in detail the aims of the organization, the rules
          and procedures that regulate it.
        </p>
        <p>
          PoliNetwork, at present, is an association for the Italian state. The next step, therefore, is to reach 50
          members to be a student association registered in the register of student associations of the Politecnico di
          Milano.
        </p>
        <p>
          Our reality, although it has never had legal and official recognition, has nevertheless distinguished itself
          over the years and has collaborated with the university itself, with the student representation, with the
          student associations registered in the register and with external entities.
        </p>
        <p>
          Our lack of recognition has therefore not prevented us from being what we are. However, the need and the
          desire to want to grow, to represent something more than what we are now, was born. For this reason,
          PoliNetwork has recently established itself as an association at the Revenue Agency, with the aim,
          subsequently, of being registered in the register of student associations of the Politecnico di Milano.
        </p>
        <p>
          What is the next step then? Reach 50 members. Are you interested in becoming a member? Click here for all the
          information! For all these years we have always, rightly, attached at the bottom of our pages the wording
          &quot;This site is not affiliated with the Politecnico di Milano&quot;, now we attach this (hopefully)
          exhaustive explanation, with the promise that the wording will change soon. <br />
          <br /> Stay tuned 📌
        </p>
      </div>
      <div className="mt-4 flex justify-end items-center">
        <Link href="/about/structure">
          <Button>Structure</Button>
        </Link>
      </div>
    </main>
  )
}
