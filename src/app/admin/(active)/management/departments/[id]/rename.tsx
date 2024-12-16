"use client";
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
import { useTransition } from "react";
import { z } from "zod";
import { renameDepartment } from "@/server/actions/departments";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  shortName: z.string().max(32),
});

type Schema = z.infer<typeof formSchema>;

type Props = {
  id: string;
  name: string;
  shortName: string | null;
};

export default function RenameDepartment({ id, name, shortName }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      shortName: shortName ?? "",
    },
  });

  function onSubmit(values: Schema) {
    startTransition(() => renameDepartment({ ...values, id }));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-3 items-center space-x-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={name}
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
                <Input
                  placeholder={shortName ?? ""}
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormDescription>
                This is the (optional) alias of the department.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            isPending ||
            ((shortName ?? "") === form.getValues().shortName &&
              name === form.getValues().name)
          }
          type="submit"
          variant="success"
          className="justify-self-start"
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}
