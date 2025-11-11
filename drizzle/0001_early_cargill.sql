CREATE INDEX IF NOT EXISTS "first_name_idx" ON "advocates" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "last_name_idx" ON "advocates" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "city_idx" ON "advocates" USING btree ("city");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "degree_idx" ON "advocates" USING btree ("degree");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "specialties_idx" ON "advocates" USING gin ("specialties");