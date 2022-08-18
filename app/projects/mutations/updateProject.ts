import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateProject = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  link1: z.string(),
  link2: z.string(),
  keywords: z.string(),
  slug: z.string(),
  summary: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateProject),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const project = await db.project.update({ where: { id }, data })

    return project
  }
)
