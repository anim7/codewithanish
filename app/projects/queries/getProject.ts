import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetProject = z.object({
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetProject), async ({ slug }) => {
  const project = await db.project.findFirst({ where: { slug } })

  if (!project) throw new NotFoundError()

  return project
})
