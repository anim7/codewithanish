import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

export const UpdateTechnology = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  logo: z.string(),
  desc: z.string(),
  invertInDarkMode: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateTechnology),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }) => {
    const technology = await db.technology.update({ where: { id }, data })

    return technology
  }
)
