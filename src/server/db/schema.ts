import {
  BOARD_ROLE,
  DEP_ROLE,
  type TBoardRole,
  type TDepRole,
  type TUserRole,
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

export const aboutBoards = createTable("about_board", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nominatedOn: timestamp("nominated_on", { mode: "date" }).notNull(),
  endedOn: timestamp("nominated_on", { mode: "date" }),
});

export const aboutBoardRelations = relations(aboutBoards, ({ many }) => ({
  members: many(aboutBoardMembers)
}))

export const aboutBoardMembers = createTable(
  "about_board_member",
  {
    boardId: varchar("board_id", { length: 255 })
      .notNull()
      .references(() => aboutBoards.id),
    tgUserId: varchar("tg_user_id", { length: 255 })
      .notNull()
      .references(() => tgUsers.id),
    resignedOn: timestamp("resigned_on", { mode: "date" }),
    role: varchar("role", { length: 255 })
      .$type<TBoardRole>()
      .default(BOARD_ROLE.MEMBER)
      .notNull(),
    secondRole: varchar("second_role", { length: 255 }).$type<TBoardRole>(),
  },
  (row) => ({
    primaryKey: [row.boardId, row.resignedOn],
  }),
);

export const aboutBoardMemberRelations = relations(aboutBoardMembers, ({ one }) => ({
  tgUser: one(tgUsers, { fields: [aboutBoardMembers.tgUserId], references: [tgUsers.id] })
}))

export const aboutDepartmentMembers = createTable("about_department_member", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  departmentId: varchar("department_id", { length: 255 })
    .notNull()
    .references(() => departments.id),
  tgUserId: varchar("tg_user_id", { length: 255 })
    .notNull()
    .references(() => tgUsers.id),
  role: varchar("role", { length: 255 })
    .$type<TDepRole>()
    .default(DEP_ROLE.MEMBER)
    .notNull(),
  nominatedOn: timestamp("nominated_on", { mode: "date" }).notNull(),
  endedOn: timestamp("nominated_on", { mode: "date" }),
});

export const aboutDepartmentMemberRelations = relations(aboutDepartmentMembers, ({ one }) => ({
  tgUser: one(tgUsers, { fields: [aboutDepartmentMembers.tgUserId], references: [tgUsers.id] })
}))

export const tgUsers = createTable("tg_user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  tgUsername: varchar("tg_username", { length: 255 }).unique().notNull(),
});

export const tgUserRelations = relations(tgUsers, ({ many }) => ({
  aboutBoards: many(aboutBoardMembers),
  aboutDepartments: many(aboutDepartmentMembers),
}))

export const departments = createTable("department", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  shortName: varchar("short_name", { length: 32 }),
});

export const departmentRelations = relations(departments, ({ many }) => ({
  aboutMembers: many(aboutDepartmentMembers),
}))

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

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
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
