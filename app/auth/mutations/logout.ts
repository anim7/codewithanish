import { BlitzCtx } from "@blitzjs/auth"

export default async function logout(_: any, ctx: BlitzCtx) {
  return await ctx.session.$revoke()
}
