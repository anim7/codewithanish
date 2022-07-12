import { Suspense } from "react"
import {
  BlitzPage,
  QueryClient,
  getQueryKey,
  GetServerSideProps,
  invokeWithMiddleware,
  dehydrate,
  useQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnologies from "app/technologies/queries/getTechnologies"
import TechnologiesListComponent from "app/technologies/components/TechnologiesList"
import { Technology } from "@prisma/client"
import TechnologiesLoading from "app/technologies/components/TechnologiesLoading"

export const TechnologiesList = () => {
  const [{ technologies }] = useQuery(getTechnologies, {
    orderBy: { id: "asc" },
  })

  return <TechnologiesListComponent techs={technologies} />
}

const TechnologiesPage: BlitzPage = () => {
  return (
    <Suspense fallback={<TechnologiesLoading />}>
      <TechnologiesList />
    </Suspense>
  )
}

TechnologiesPage.getLayout = (page) => <Layout>{page}</Layout>

export default TechnologiesPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getTechnologies, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getTechnologies, null, ctx))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
