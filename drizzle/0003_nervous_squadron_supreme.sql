CREATE TABLE IF NOT EXISTS "board" (
	"user_id" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'member' NOT NULL,
	CONSTRAINT "board_user_id_role_pk" PRIMARY KEY("user_id","role")
);
--> statement-breakpoint
ALTER TABLE "department_users" ALTER COLUMN "department_role" SET DEFAULT 'member';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
