import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreatePost = z.object({
  title: z.string(),
  metaTitle: z.string(),
  summary: z.string(),
  content: z.string(),
  slug: z.string(),
  // timeToRead: z.number(),
  userId: z.number(),
  published: z.boolean(),
  // publishedAt: z.date(),
  image: z.string(),
})

export default resolver.pipe(resolver.zod(CreatePost), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const d = {
    ...input,
    timeToRead: Math.ceil(input.content.split(" ").length / 200),
    publishedAt: input.published ? new Date() : "null",
  }
  const post = await db.post.create({ data: d })

  return post
})
