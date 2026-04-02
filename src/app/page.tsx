import { Users } from "lucide-react"
import { FaBookBookmark } from "react-icons/fa6"
import { CardCaption } from "@/components/card-caption"
import { Button } from "@/components/ui/button"
import { ButtonWithIcon } from "@/components/ui/buttonWithIcon"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="typo-headline-large bg mb-4 font-bold">Welcome to PoliNetwork</h2>
      <p className="mb-4">
        PoliNetwork is a student association dedicated to connecting and supporting students at Politecnico.
      </p>
      <div className="flex w-90 flex-col items-center justify-center gap-2 rounded-rectangles bg-red py-8">
        <p className="typo-body-medium text-text-accent-darkbg">Test with figma variables</p>
        <div className="h-20 w-20 rounded-images bg-background-blur" />
        <ButtonWithIcon variant="primary" icon={Users} iconPosition="left" text="Diventa socio" />
        <ButtonWithIcon variant="tertiary" icon={Users} iconPosition="right" text="Diventa socio" />
        <ButtonWithIcon variant="tertiaryBlur" icon={Users} iconPosition="left" text="Diventa socio" />
        <Button variant="link">Link</Button>
      </div>
      <div className="flex gap-4">
        <CardCaption
          title="Title"
          caption="Beccatevi questo lorem ipsum dolor sit amet: lorem ipsum dolor sit amet"
          icon={FaBookBookmark}
          iconPosition="right"
        ></CardCaption>
        <CardCaption
          title="CardCaption 2"
          caption="Beccatevi questo lorem ipsum dolor sit amet: lorem ipsum dolor sit amet"
          icon={FaBookBookmark}
          iconPosition="top"
        ></CardCaption>
      </div>
    </main>
  )
}
