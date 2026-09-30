import { Shape } from "@/components/shapes"

export function AccordionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-300 group-data-[state=open]/accordion:opacity-100">
      <Shape variant="big-blue" className="-top-70 -right-70 absolute h-150 w-150 rotate-65 opacity-100" />
      <Shape variant="big-teal" className="-top-70 -right-50 absolute h-180 w-180 rotate-60 opacity-100" />

      <div className="-right-20 -top-20 absolute h-150 w-150 opacity-100">
        <Shape variant="looper" className="absolute inset-0 h-full w-full rotate-260 object-contain" />
      </div>
    </div>
  )
}
