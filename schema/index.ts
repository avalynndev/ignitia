import {
  pgTable,
  text,
  serial,
  timestamp,
  boolean,
  integer,
  json,
  primaryKey,
} from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
});

export const idea = pgTable(
  "idea",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    shortDescription: text("shortDescription").notNull(),
    solves: text("solves").notNull(),
    description: text("description").notNull(),
    tags: json("tags").$type<string[]>().default([]).notNull(),
    stars: integer("rating").default(0).notNull(),
    featured: boolean("featured").default(false).notNull(),
    image: text("image"),
    category: text("category"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    username: text("username").references(() => user.username, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("idea_title_idx").on(table.title),
    index("idea_username_idx").on(table.username),
    index("idea_category_idx").on(table.category),
  ],
);

export const ideaStars = pgTable(
  "idea_stars",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ideaId: integer("idea_id")
      .notNull()
      .references(() => idea.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.ideaId] }),
  }),
);

export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ideaId: integer("idea_id")
    .notNull()
    .references(() => idea.id, { onDelete: "cascade" }),
  username: text("username").references(() => user.username, {
    onDelete: "set null",
  }),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const schema = { user, session, account, verification, idea, comment };
