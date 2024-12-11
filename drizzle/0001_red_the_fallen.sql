CREATE TABLE IF NOT EXISTS "department" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"short_name" varchar(32)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department_users" (
	"department_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"department_role" varchar(255) NOT NULL,
	CONSTRAINT "department_users_department_id_user_id_pk" PRIMARY KEY("department_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "department_users" ADD CONSTRAINT "department_users_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "department_users" ADD CONSTRAINT "department_users_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
