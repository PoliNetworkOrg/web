import { Button } from "@/components/button";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-4 typo-headline-large font-bold bg">Welcome to PoliNetwork</h2>
      <p className="mb-4">
        PoliNetwork is a student association dedicated to connecting and supporting students at Politecnico.
      </p>
      <div className="bg-red rounded-rectangles w-90 py-8 flex justify-center items-center flex-col gap-2">
        <p className="text-text-accent-darkbg typo-body-medium">Test with figma variables</p>
        <div className="bg-background-blur w-20 h-20 rounded-images" />
        <button
          className="bg-button-primary text-text-accent-lightbg typo-label-large px-6 py-2.5 rounded-buttonsM"
          type="button"
        >
          More groups
        </button>
      </div>
    </main>
  )
}
