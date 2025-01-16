CREATE TABLE IF NOT EXISTS "about_board_member" (
	"board_id" varchar(255) NOT NULL,
	"tg_user_id" varchar(255) NOT NULL,
	"resigned_on" timestamp,
	"role" varchar(255) DEFAULT 'member' NOT NULL,
	"second_role" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "about_board" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"nominated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "about_department_members" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"department_id" varchar(255) NOT NULL,
	"tg_user_id" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'member' NOT NULL,
	"nominated_on" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tg_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"tg_username" varchar(255) NOT NULL,
	CONSTRAINT "tg_user_tg_username_unique" UNIQUE("tg_username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_board_member" ADD CONSTRAINT "about_board_member_board_id_about_board_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."about_board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_board_member" ADD CONSTRAINT "about_board_member_tg_user_id_tg_user_id_fk" FOREIGN KEY ("tg_user_id") REFERENCES "public"."tg_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_department_members" ADD CONSTRAINT "about_department_members_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_department_members" ADD CONSTRAINT "about_department_members_tg_user_id_tg_user_id_fk" FOREIGN KEY ("tg_user_id") REFERENCES "public"."tg_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
