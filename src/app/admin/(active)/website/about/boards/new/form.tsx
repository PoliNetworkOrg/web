"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const months = new Array(12).fill(0).map((_, i) => ({
  value: i.toString(),
  label: (i + 1).toString(),
}));

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TTGUser } from "@/server/db/schema";
import { useState } from "react";
import { BOARD_ROLE, TBoardRole } from "@/constants";
import { CreateTgUser } from "@/components/create-tg-user";

type Props = {
  nth: number;
  users: TTGUser[];
};

export default function NewAboutBoardForm({ nth, users }: Props) {
  const [userOpen, setUserOpen] = useState<boolean>(false);

  const [nominated, setNominated] = useState<[string, string]>(["", ""]);
  const [ended, setEnded] = useState<[string, string]>(["", ""]);

  const [selectedId, setSelectedId] = useState<string>();
  const [firstRole, setFirstRole] = useState<TBoardRole>();
  const [secondRole, setSecondRole] = useState<TBoardRole>();

  const thisYear = new Date().getFullYear();
  const years = new Array(thisYear - 2022 + 1).fill(0).map((_, i) => ({
    value: (thisYear - i).toString(),
    label: (thisYear - i).toString(),
  }));

  return (
    <div className="grid grid-cols-1 justify-start space-y-4">
      <h3 className="text-xl">
        Create the <span className="font-bold">#{nth}</span> board.
      </h3>
      <div className="flex items-center gap-4">
        <p>Nominated on:</p>
        <Select
          value={nominated[0]}
          onValueChange={(v) => setNominated((old) => [v, old[1]])}
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="max-h-max">
            {months.map((m) => (
              <SelectItem value={m.value} key={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={nominated[1]}
          onValueChange={(v) => setNominated((old) => [old[0], v])}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem value={y.value} key={y.value}>
                {y.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <p>Ended on:</p>
        <Select
          value={ended[0]}
          onValueChange={(v) => setEnded((old) => [v, old[1]])}
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="max-h-max">
            {months.map((m) => (
              <SelectItem value={m.value} key={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={ended[1]}
          onValueChange={(v) => setEnded((old) => [old[0], v])}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem value={y.value} key={y.value}>
                {y.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <p>Members</p>
        <div className="flex items-center gap-4">
          <Popover open={userOpen} onOpenChange={setUserOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={userOpen}
                className="w-[200px] justify-between"
              >
                {selectedId
                  ? users.find((u) => u.id === selectedId)?.name
                  : "Select user..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>
                    No user found.{" "}
                    <CreateTgUser
                      users={users}
                      trigger={<button className="underline">Create</button>}
                    />
                  </CommandEmpty>
                  <CommandGroup>
                    {users.map((u) => (
                      <CommandItem
                        key={u.id}
                        value={u.id}
                        onSelect={(id) => {
                          setSelectedId(id === selectedId ? "" : id);
                          setUserOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedId === u.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {u.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="max-h-max">
              {Object.values(BOARD_ROLE).map((r) => (
                <SelectItem value={r} key={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Second Role" />
            </SelectTrigger>
            <SelectContent className="max-h-max">
              {Object.values(BOARD_ROLE).map((r) => (
                <SelectItem value={r} key={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
