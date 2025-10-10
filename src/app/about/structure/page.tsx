//import { getBoardRoleString, getDepartmentRoleString } from "@/lib/i18n";
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { getInitials } from "@/lib/utils";
import { NavigateBack } from "@/components/navigate-back"
import { Separator } from "@/components/ui/separator"

export default async function AboutStructurePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-accent-foreground">
        <NavigateBack />
        Structure
      </h2>
      <div className="grid grid-rows-[auto_auto_1fr] items-start gap-8 xl:grid-cols-[1fr_auto_1fr]">
        <div className="grid gap-y-4">
          <h3 className="text-xl font-bold text-primary-foreground">Board members</h3>
          <ul className="grid space-y-3">
            {/* board.map((u) => {
              const roles = u.roles
                .map(getBoardRoleString)
                .filter((s) => s.length);

              return (
                <li key={u.userId} className="flex gap-3">
                  <Avatar className="aspect-square w-full max-w-[40px] rounded-lg">
                    {u.user.image && (
                      <AvatarImage
                        src={u.user.image}
                        alt={`propic of ${u.user.name}`}
                      />
                    )}
                    <AvatarFallback className="rounded-lg bg-accent/80">
                      {getInitials(u.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="grow rounded-md bg-accent/80 px-4 py-2">
                    {u.user.name}
                  </p>
                  {roles.length > 0 && (
                    <div className="flex flex-col gap-3 md:flex-row">
                      {roles.map((r) => (
                        <p
                          key={r}
                          className="w-36 rounded-md bg-accent/40 py-2 text-center"
                        >
                          {r}
                        </p>
                      ))}
                    </div>
                  )}
                </li>
              );
            }) */}
          </ul>
        </div>
        <Separator orientation="vertical" className="hidden xl:block" />
        <Separator orientation="horizontal" className="xl:hidden" />
        <div className="grid gap-y-4">
          <h3 className="text-xl font-bold text-primary-foreground">Departments</h3>
          {/* departments.map((d) => (
            <div className="grid gap-y-2" key={d.id}>
              <h4 className="text-lg font-semibold text-primary-foreground">
                {d.name}
              </h4>
              <ul className="grid space-y-3">
                {d.departmentUsers
                  .filter((u) => u.role !== DEP_ROLE.MEMBER)
                  .sort(
                    (a, b) =>
                      (depRoleOrderMap[a.role] ?? Infinity) -
                      (depRoleOrderMap[b.role] ?? Infinity),
                  )
                  .map((u) => (
                    <li key={u.userId} className="flex gap-3">
                      <Avatar className="aspect-square h-full w-auto rounded-lg">
                        {u.user.image && (
                          <AvatarImage
                            src={u.user.image}
                            alt={`propic of ${u.user.name}`}
                          />
                        )}
                        <AvatarFallback className="rounded-lg bg-accent/80">
                          {getInitials(u.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="grow rounded-md bg-accent/80 px-4 py-2">
                        {u.user.name}
                      </p>
                      <p className="w-36 rounded-md bg-accent/40 py-2 text-center">
                        {getDepartmentRoleString(u.role)}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          )) */}
        </div>
      </div>
    </main>
  )
}

//const DEP_ROLE_ORDER: TDepRole[] = [
//  DEP_ROLE.HEAD,
//  DEP_ROLE.DEPUTY_HEAD,
//] as const;
//
//const depRoleOrderMap = DEP_ROLE_ORDER.reduce(
//  (acc, role, index) => ({ ...acc, [role]: index }),
//  {} as Record<string, number>,
//);
