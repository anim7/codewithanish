import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreatePost = z.object({
  title: z.string(),
  metaTitle: z.string(),
  summary: z.string(),
  content: z.string(),
  slug: z.string(),
  userId: z.number(),
  published: z.boolean(),
  image: z.string(),
  keywords: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreatePost),
  resolver.authorize("ADMIN"),
  async (input) => {
    const d = {
      ...input,
      timeToRead: Math.ceil(input.content.split(" ").length / 200),
      publishedAt: input.published ? new Date() : "",
    }
    const post = await db.post.create({ data: d })

    return post
  }
)
