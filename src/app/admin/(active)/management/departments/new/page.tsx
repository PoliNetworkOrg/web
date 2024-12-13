"use client";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTransition } from "react";
import { z } from "zod";
import { createDepartment } from "@/server/actions/departments";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  shortName: z.string().max(32),
});

type Schema = z.infer<typeof formSchema>;

export default function NewDepartment() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortName: "",
    },
  });

  function onSubmit(values: Schema) {
    startTransition(() => createDepartment(values));
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <Link href="/admin/management" className="opacity-50">
          Management
        </Link>{" "}
        <ArrowRight />{" "}
        <Link href="/admin/management/departments/" className="opacity-50">
          Departments
        </Link>{" "}
        <ArrowRight /> New
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-96 space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Gestione Progetti Innovativi e Supporto Tecnico"
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the original department name written in the Internal
                  Regulation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Name</FormLabel>
                <FormControl>
                  <Input placeholder="IT" {...field} autoComplete="off" />
                </FormControl>
                <FormDescription>
                  This is the (optional) alias of the department.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            {isPending ? "Creating..." : "Submit"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
