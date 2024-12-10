export const USER_ROLE = {
  ADMIN_ORG: "owner",
  MEMBER: "member",
  INACTIVE: "inactive",
} as const;
export type TUserRole = typeof USER_ROLE[keyof typeof USER_ROLE]

export const DEP_ROLE = {
  HEAD: "head",
  DEPUTY_HEAD: "head",
  MEMBER: "member"
} as const;
export type TDepRole = typeof DEP_ROLE[keyof typeof DEP_ROLE]
