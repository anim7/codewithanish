import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdatePost = z.object({
  id: z.number(),
  title: z.string().optional(),
  metaTitle: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  slug: z.string().optional(),
  timeToRead: z.number().optional(),
  userId: z.number().optional(),
  published: z.boolean().optional(),
  publishedAt: z.date().optional(),
  image: z.string(),
  keywords: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }) => {
    const post = await db.post.update({ where: { id }, data })

    return post
  }
)
