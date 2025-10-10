import { DEPARTMENT_ID } from "./constants"
import { db } from "./server/db"
import { departments } from "./server/db/schema"

async function createDepartmentsIfNotExist() {
  const dep_ids = Object.values(DEPARTMENT_ID)
  console.log(`[DB] checking if departments are all created.`)
  for (const depId of dep_ids) {
    const dep = await db.query.departments.findFirst({ where: (t, { eq }) => eq(t.id, depId) })
    if (dep) {
      console.log(`[DB] department with id "${depId}" found.`)
    } else {
      console.log(`[DB] department with id "${depId}" not found, creating...`)
      await db.insert(departments).values({ id: depId, name: depId, shortName: depId })
    }
  }
}

export async function register() {
  await createDepartmentsIfNotExist()
}
