import type { TBoardRole, TDepRole, TDepartmentId } from "@/constants";
import { DEPARTMENT_ID, DEP_ROLE, BOARD_ROLE } from "@/constants";

type DepartmentRolePermissions = Record<TDepRole, boolean>;
type DepartmentPermissions = Record<TDepartmentId, DepartmentRolePermissions>;
type BoardPermissions = Record<TBoardRole, boolean>;
type Permissions = {
  departments: DepartmentPermissions;
  board: BoardPermissions;
};

const defaultDepRolePerm: DepartmentRolePermissions = {
  [DEP_ROLE.HEAD]: false,
  [DEP_ROLE.DEPUTY_HEAD]: false,
  [DEP_ROLE.MEMBER]: false,
};

const defaultDepPerms: DepartmentPermissions = {
  [DEPARTMENT_ID.EVENTS]: { ...defaultDepRolePerm },
  [DEPARTMENT_ID.IT]: { ...defaultDepRolePerm },
  [DEPARTMENT_ID.SOCIAL]: { ...defaultDepRolePerm },
  [DEPARTMENT_ID.HR]: { ...defaultDepRolePerm },
  [DEPARTMENT_ID.INST_RELATIONS]: { ...defaultDepRolePerm },
};

// default permits every board member
const defaultBoardPerms: BoardPermissions = {
  [BOARD_ROLE.PRESIDENT]: true,
  [BOARD_ROLE.VICE_PRESIDENT]: true,
  [BOARD_ROLE.SECRETARY]: true,
  [BOARD_ROLE.TREASURER]: true,
  [BOARD_ROLE.MEMBER]: true,
};

type createPermissionsProps = {
  departments?: Partial<Record<TDepartmentId, TDepRole[]>>;
  board?: TBoardRole[];
};

/**
 * Creates a permissions object applying defaults where no input is provided.
 *
 * @param {Object} props - The input parameters for creating permissions.
 * @param {Partial<Record<TDepartmentId, TDepRole[]>>} [props.departments] -
 *   Optional record where keys are department IDs and values are arrays of roles to be granted permissions.
 *   Roles not included will retain their default state (`false`).
 * @param {TBoardRole[]} [props.board] -
 *   Optional array of board roles to be granted permissions. Roles not included will be set to `false`.
 *
 * @returns {Permissions} The permissions object containing department and board permissions.
 *
 * @example
 * // No input (defaults applied)
 * createPermissions();
 * // Output:
 * // {
 * //   departments: {
 * //     EVENTS: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     IT: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     SOCIAL: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     HR: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     INST_RELATIONS: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //   },
 * //   board: {
 * //     PRESIDENT: true,
 * //     VICE_PRESIDENT: true,
 * //     SECRETARY: true,
 * //     TREASURER: true,
 * //     MEMBER: true,
 * //   },
 * // }
 *
 * @example
 * // Customizing department permissions
 * createPermissions({
 *   departments: {
 *     EVENTS: [DEP_ROLE.HEAD],
 *     SOCIAL: [DEP_ROLE.HEAD, DEP_ROLE.DEPUYT_MEMBER],
 *     IT: [DEP_ROLE.HEAD, DEP_ROLE.DEPUTY_HEAD, DEP_ROLE.MEMBER],
 *   },
 * });
 * // Output:
 * // {
 * //   departments: {
 * //     EVENTS: { HEAD: true, DEPUTY_HEAD: false, MEMBER: false },
 * //     IT: { HEAD: false, DEPUTY_HEAD: false, MEMBER: true },
 * //     SOCIAL: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     HR: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     INST_RELATIONS: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //   },
 * //   board: {
 * //     PRESIDENT: true,
 * //     VICE_PRESIDENT: true,
 * //     SECRETARY: true,
 * //     TREASURER: true,
 * //     MEMBER: true,
 * //   },
 * // }
 *
 * @example
 * // Customizing board permissions
 * createPermissions({
 *   board: [BOARD_ROLE.PRESIDENT, BOARD_ROLE.SECRETARY],
 * });
 * // Output:
 * // {
 * //   departments: {
 * //     EVENTS: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     IT: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     SOCIAL: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     HR: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //     INST_RELATIONS: { HEAD: false, DEPUTY_HEAD: false, MEMBER: false },
 * //   },
 * //   board: {
 * //     PRESIDENT: true,
 * //     VICE_PRESIDENT: false,
 * //     SECRETARY: true,
 * //     TREASURER: false,
 * //     MEMBER: false,
 * //   },
 * // }
 */
export function createPermissions({
  departments: inputDepartments,
  board: inputBoard,
}: createPermissionsProps = {}): Permissions {
  const departments: DepartmentPermissions = defaultDepPerms;
  const board: BoardPermissions = defaultBoardPerms;

  if (inputDepartments) {
    Object.keys(inputDepartments)
      .map((k) => k as TDepartmentId)
      .forEach((k) => {
        inputDepartments[k]?.map((rk) => {
          departments[k][rk] = true;
        });
      });
  }

  if (inputBoard) {
    Object.keys(board)
      .map((k) => k as TBoardRole)
      .filter((k) => !inputBoard.includes(k))
      .forEach((k) => {
        board[k] = false;
      });
  }

  return {
    departments,
    board,
  };
}
