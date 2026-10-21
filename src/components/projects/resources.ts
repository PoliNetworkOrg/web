import type { IconType } from "react-icons"
import { FaAndroid, FaApple, FaGithub, FaLinux, FaWindows } from "react-icons/fa6"
import { FiGlobe } from "react-icons/fi"
import type { ApiOutput } from "@/types"

export type Project = ApiOutput["web"]["projects"]["getAllProjects"][number]

export type ProjectResourceKind = "web" | "windows" | "macos" | "linux" | "android" | "ios" | "source"

/** A way to use or get a project: a download for a platform, the web app or the source code. */
export type ProjectResource = { kind: ProjectResourceKind; href: string }

export const resourceDetails: Record<
  ProjectResourceKind,
  { title: string; description: string; cta: string; icon: IconType }
> = {
  web: {
    title: "Web",
    description: "Usalo direttamente dal browser, senza installare nulla.",
    cta: "Apri il sito",
    icon: FiGlobe,
  },
  windows: {
    title: "Windows",
    description: "Scarica l’installer per Windows.",
    cta: "Scarica per Windows",
    icon: FaWindows,
  },
  macos: { title: "macOS", description: "Scarica l’app per macOS.", cta: "Scarica per macOS", icon: FaApple },
  linux: { title: "Linux", description: "Scarica il pacchetto per Linux.", cta: "Scarica per Linux", icon: FaLinux },
  android: { title: "Android", description: "Installa l’app su Android.", cta: "Scarica per Android", icon: FaAndroid },
  ios: { title: "iOS", description: "Installa l’app su iPhone e iPad.", cta: "Scarica per iOS", icon: FaApple },
  source: {
    title: "Codice sorgente",
    description: "Consulta il codice, segui il README e contribuisci al progetto.",
    cta: "Vai alla repository",
    icon: FaGithub,
  },
}

/**
 * The backend does not expose per-platform downloads yet: until it does, the only resource is the project `link`,
 * shown as source code when it points to a repository and as the web app otherwise. Replace this with the API field.
 */
export function getProjectResources(project: Project): ProjectResource[] {
  if (!project.link) return []
  const isRepository = /^https:\/\/(github\.com|gitlab\.com)\//.test(project.link)
  return [{ kind: isRepository ? "source" : "web", href: project.link }]
}
