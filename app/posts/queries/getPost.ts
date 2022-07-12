import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPost = z.object({
  slug: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPost), async ({ slug }) => {
  const post = await db.post.findFirst({ where: { slug } })

  if (!post) throw new NotFoundError()

  return post
})
