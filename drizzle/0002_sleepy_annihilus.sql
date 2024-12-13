ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'inactive';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;