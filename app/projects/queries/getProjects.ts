import { resolver } from "@blitzjs/rpc"
import { paginate } from "blitz"
import db, { Prisma } from "db"

interface GetProjectsInput
  extends Pick<Prisma.ProjectFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetProjectsInput) => {
  const {
    items: projects,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.project.count({ where }),
    query: (paginateArgs) => db.project.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    projects,
    nextPage,
    hasMore,
    count,
  }
})
