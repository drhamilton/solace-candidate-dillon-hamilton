import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    specialties: jsonb("specialties").default([]).notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    // Composite GIN index for efficient text search across all fields
    // Concatenates firstName, lastName, city, and degree into single searchable field
    // More efficient than separate indexes: less storage, faster writes, same search performance
    searchIdx: index("advocates_search_idx").using(
      "gin",
      sql`(${table.firstName} || ' ' || ${table.lastName} || ' ' || ${table.city} || ' ' || ${table.degree}) gin_trgm_ops`
    ),
    // GIN index for JSONB specialties array
    specialtiesIdx: index("specialties_idx").using("gin", table.specialties),
  })
);

export { advocates };
