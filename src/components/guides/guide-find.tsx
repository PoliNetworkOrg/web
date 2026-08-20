import { FiLogIn } from "react-icons/fi"
import { CardCaption } from "@/components/card-caption"


const guidesMobile = {
  title: "Trova le guide del tuo corso",
  caption: "Una raccolta di guide scritte dagli studenti del tuo corso",
  icon: FiLogIn,
}

export default function GuideFind() {
  return (
    <>
    
      {/* Mobile */}
      <div className="flex w-full flex-col items-center gap-32 sm:hidden">
        <CardCaption {...guidesMobile} className="p-6" />
      </div>

      {/* Desktop */}
      <div className="hidden w-full flex-col gap-2 sm:flex">
        <CardCaption {...guidesMobile} className="w-full max-w-4xl self-center p-6" />
      </div>
    </>
  );
}