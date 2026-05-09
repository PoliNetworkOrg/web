import { FiGlobe, FiMoon, FiUser } from "react-icons/fi"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const iconConfigs = [
  { key: "user", label: "User profile", Icon: FiUser, onClick: () => console.log("User icon clicked") },
  { key: "globe", label: "Language", Icon: FiGlobe, onClick: () => console.log("Globe icon clicked") },
  { key: "moon", label: "Theme", Icon: FiMoon, onClick: () => console.log("Moon icon clicked") },
]

export const IconButtonsMobile = () => (
  <>
    {iconConfigs.map(({ key, label, Icon, onClick }) => (
      <button key={key} type="button" onClick={onClick} aria-label={label}>
        <Icon size={24} className="text-black" />
      </button>
    ))}
  </>
)

export const IconButtonsDesktop = ({ removeHoverClass }: { removeHoverClass: string }) => (
  <>
    {iconConfigs.map(({ key, label, Icon, onClick }) => (
      <NavigationMenuLink key={key} asChild className={cn("p-0", removeHoverClass)}>
        <button type="button" onClick={onClick} aria-label={label}>
          <Icon size={24} className="size-[24px] text-text-primary" />
        </button>
      </NavigationMenuLink>
    ))}
  </>
)
