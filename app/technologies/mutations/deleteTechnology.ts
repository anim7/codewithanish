import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTechnology = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteTechnology),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technology = await db.technology.deleteMany({ where: { id } })

    return technology
  }
)
