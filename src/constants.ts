export const USER_ROLE = {
  ADMIN_ORG: "owner",
  MEMBER: "member",
  INACTIVE: "inactive",
  DISABLED: "disabled",
} as const;
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const DEPARTMENT_ID = {
  IT: "it",
  SOCIAL: "social",
  HR: "hr",
  INST_RELATIONS: "institutional_relations",
  EVENTS: "events",
} as const;
export type TDepartmentId = (typeof DEPARTMENT_ID)[keyof typeof DEPARTMENT_ID];
