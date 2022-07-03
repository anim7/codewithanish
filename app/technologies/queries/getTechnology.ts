import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTechnology = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTechnology), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const technology = await db.technology.findFirst({ where: { id } })

  if (!technology) throw new NotFoundError()

  return technology
})
