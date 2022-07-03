import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTechnologiesInput
  extends Pick<Prisma.TechnologyFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetTechnologiesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: technologies,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.technology.count({ where }),
      query: (paginateArgs) => db.technology.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      technologies,
      nextPage,
      hasMore,
      count,
    }
  }
)
