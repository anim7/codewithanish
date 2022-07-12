import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTechnology = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteTechnology),
  resolver.authorize("ADMIN"),
  async ({ id }) => {
    const technology = await db.technology.deleteMany({ where: { id } })

    return technology
  }
)
