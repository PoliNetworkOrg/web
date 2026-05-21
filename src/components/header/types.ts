export type HeaderSubmenuItem = {
  title: string
  href: string
  icon: React.ElementType
}

export type HeaderMenuItem =
  | {
      title: string
      href: string
    }
  | {
      title: string
      menu: HeaderSubmenuItem[]
    }
