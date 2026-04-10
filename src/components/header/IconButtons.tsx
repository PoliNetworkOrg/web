import { FiGlobe, FiMoon, FiUser } from "react-icons/fi"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { handleGlobeIconClick, handleMoonIconClick, handleUserIconClick } from "./handlers"

const iconConfigs = [
  { key: "user", label: "User profile", Icon: FiUser, onClick: handleUserIconClick },
  { key: "globe", label: "Language", Icon: FiGlobe, onClick: handleGlobeIconClick },
  { key: "moon", label: "Theme", Icon: FiMoon, onClick: handleMoonIconClick },
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
      <NavigationMenuLink key={key} asChild className={`${removeHoverClass} p-0`}>
        <button type="button" onClick={onClick} aria-label={label}>
          <Icon size={24} className="text-text-primary" />
        </button>
      </NavigationMenuLink>
    ))}
  </>
)
