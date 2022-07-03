import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTechnology = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  logo: z.string(),
  desc: z.string(),
  invertInDarkMode: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateTechnology),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technology = await db.technology.update({ where: { id }, data })

    return technology
  }
)
