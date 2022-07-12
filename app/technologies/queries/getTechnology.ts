import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTechnology = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTechnology), async ({ id }) => {
  const technology = await db.technology.findFirst({ where: { id } })

  if (!technology) throw new NotFoundError()

  return technology
})
