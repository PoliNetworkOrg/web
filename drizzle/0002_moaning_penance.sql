ALTER TABLE "about_department_members" RENAME TO "about_department_member";--> statement-breakpoint
ALTER TABLE "about_department_member" DROP CONSTRAINT "about_department_members_department_id_department_id_fk";
--> statement-breakpoint
ALTER TABLE "about_department_member" DROP CONSTRAINT "about_department_members_tg_user_id_tg_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_department_member" ADD CONSTRAINT "about_department_member_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "about_department_member" ADD CONSTRAINT "about_department_member_tg_user_id_tg_user_id_fk" FOREIGN KEY ("tg_user_id") REFERENCES "public"."tg_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
