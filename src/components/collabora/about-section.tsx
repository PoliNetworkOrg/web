import { FiArrowUpRight, FiMessageSquare, FiUsers } from "react-icons/fi";
import { MdOutlineHandshake, MdOutlineSchool } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { CardIcon } from "../card-icon";

const cards = [
  {
    title: "18k+",
    description: (
      <>
        <span className="text-blue-secondary">Membri</span> del nostro gruppo
        Telegram principale
      </>
    ),
    icon: FiMessageSquare,
    size: "sm",
  },
  {
    title: "45k+",
    description: (
      <>
        <span className="text-blue-secondary">Studenti</span> raggiunti da
        PoliNetwork ogni anno
      </>
    ),
    icon: MdOutlineSchool,
    size: "sm",
  },
  {
    title: "1000+",
    description: (
      <>
        <span className="text-blue-secondary">Persone</span> nel nostro evento
        più grande
      </>
    ),

    icon: FiUsers,
    size: "sm",
  },
  {
    title: "5",
    description: (
      <>
        <span className="text-blue-secondary">Team Operativi</span> pronti a
        collaborare
      </>
    ),
    icon: MdOutlineHandshake,
    size: "sm",
  },
] as const;

export function AboutSection() {
  return (
    <section className="flex w-full flex-row gap-28 px-2 md:px-36 flex-wrap">
      <div className="min-w-0 flex flex-1 basis-120 flex-col gap-6">
        <h2 className="md:typo-display-large typo-display-medium md:text-start text-center">
          Chi siamo?
        </h2>

        <div className="flex flex-col gap-5 text-start">
          <p className="typo-title-large md:text-start text-center">
            PoliNetwork è l'infrastruttura di comunicazione studentesca del
            Politecnico di Milano.
          </p>
          <p className="typo-title-large md:text-start text-center">
            Gestiamo oltre 500 gruppi Telegram e WhatsApp, una presenza social
            in crescita e strumenti digitali usati ogni anno da decine di
            migliaia di studenti di ingegneria, architettura e design.
          </p>
          <div>
            <p className="typo-title-large md:text-start text-center text-blue-secondary">
              Chi entra al PoliMi, prima o poi, incontra PoliNetwork.
            </p>
            <p className="typo-title-large md:text-start text-center">
              (e persino studenti di liceo o altri atenei)
            </p>
          </div>
        </div>

        <Button variant="primary" size="lg" className="w-fit gap-2 self-center md:self-start">
          Scopri la nostra storia
          <FiArrowUpRight />
        </Button>
      </div>

      <div className="min-w-0 flex-1 basis-120 grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-9">
        {cards.map((card) => (
          <CardIcon
            key={card.title}
            {...card}
            align="start"
            className="min-w-0 w-full"
          />
        ))}
      </div>
    </section>
  );
}
