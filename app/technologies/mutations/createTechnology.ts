import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateTechnology = z.object({
  name: z.string(),
  link: z.string(),
  logo: z.string(),
  desc: z.string(),
  invertInDarkMode: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(CreateTechnology),
  resolver.authorize("ADMIN"),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const technology = await db.technology.create({ data: input })
    return technology
  }
)
