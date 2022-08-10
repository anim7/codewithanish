import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateProject = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  image: z.string(),
  githubLink: z.string(),
  keywords: z.string(),
  slug: z.string(),
})

export default resolver.pipe(resolver.zod(CreateProject), resolver.authorize(), async (input) => {
  const project = await db.project.create({ data: input })

  return project
})
