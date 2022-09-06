import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { getQueryKey, dehydrate, useQuery, getQueryClient } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getTechnologies from "app/technologies/queries/getTechnologies"
import TechnologiesListComponent from "app/technologies/components/TechnologiesList"
import TechnologiesLoading from "app/technologies/components/TechnologiesLoading"

export const TechnologiesList = () => {
  const [{ technologies }] = useQuery(getTechnologies, {
    orderBy: { id: "asc" },
  })

  return <TechnologiesListComponent techs={technologies} />
}

const Technologies: BlitzPage = () => {
  return (
    <Suspense fallback={<TechnologiesLoading />}>
      <TechnologiesList />
    </Suspense>
  )
}

Technologies.getLayout = (page) => <Layout>{page}</Layout>

export default Technologies

// export const getServerSideProps: GetServerSideProps = gSSP(async (ctx) => {
//   const queryClient = getQueryClient()
//   const queryKey = getQueryKey(getTechnologies, null)
//   await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getTechnologies, null, ctx))
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// })
