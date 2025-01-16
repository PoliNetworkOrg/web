ALTER TABLE "about_board" ALTER COLUMN "nominated_on" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "about_board" ADD COLUMN "ended_on" timestamp;