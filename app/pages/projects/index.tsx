import { Suspense } from "react"
import {
  BlitzPage,
  useQuery,
  GetServerSideProps,
  QueryClient,
  dehydrate,
  getQueryKey,
  invokeWithMiddleware,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import Projects from "app/projects/components/Projects"

export const ProjectsList = () => {
  const [{ projects }] = useQuery(getProjects, {
    orderBy: { id: "asc" },
  })
  return <Projects projects={projects} />
}

const ProjectsPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsList />
    </Suspense>
  )
}

ProjectsPage.getLayout = (page) => <Layout title="CodeWithAnish - Projects">{page}</Layout>

export default ProjectsPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getProjects, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getProjects, null, ctx))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
