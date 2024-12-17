import {
  type TBoardRole,
  type TDepRole,
  type TUserRole,
  BOARD_ROLE,
  DEP_ROLE,
  USER_ROLE,
} from "@/constants";
import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const board = createTable(
  "board",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    role: varchar("role", { length: 255 })
      .$type<TBoardRole>()
      .default(BOARD_ROLE.MEMBER)
      .notNull(),
  },
  (row) => ({
    pk: primaryKey({ columns: [row.userId, row.role] }),
  }),
);

export const boardRelations = relations(board, ({ one }) => ({
  user: one(users, {
    fields: [board.userId],
    references: [users.id],
  }),
}));

export const departments = createTable("department", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  shortName: varchar("short_name", { length: 32 }),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  departmentUsers: many(departmentUsers),
}));

export const departmentUsers = createTable(
  "department_users",
  {
    departmentId: varchar("department_id", { length: 255 })
      .notNull()
      .references(() => departments.id),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    role: varchar("department_role", { length: 255 })
      .$type<TDepRole>()
      .default(DEP_ROLE.MEMBER)
      .notNull(),
  },
  (row) => ({
    pk: primaryKey({ columns: [row.departmentId, row.userId] }),
  }),
);

export const departmentUsersRelations = relations(
  departmentUsers,
  ({ one }) => ({
    department: one(departments, {
      fields: [departmentUsers.departmentId],
      references: [departments.id],
    }),
    user: one(users, {
      fields: [departmentUsers.userId],
      references: [users.id],
    }),
  }),
);

/**
 * AUTH SCHEMAS
 */
export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 128 })
    .$type<TUserRole>()
    .default(USER_ROLE.INACTIVE)
    .notNull(),
  image: varchar("image", { length: 255 }),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
});

export type TUser = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  departmentUsers: many(departmentUsers),
  board: one(board, {
    fields: [users.id],
    references: [board.userId],
  }),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
