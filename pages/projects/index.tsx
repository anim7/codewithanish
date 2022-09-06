import { gSSP } from "app/blitz-server"
import { GetServerSideProps } from "next"
import { useQuery, QueryClient, dehydrate, getQueryKey } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import ProjectsComponent from "app/projects/components/Projects"
import ProjectsLoading from "app/projects/components/ProjectsLoading"

export const ProjectsList = () => {
  const [{ projects }] = useQuery(getProjects, {
    orderBy: { id: "asc" },
  })
  return <ProjectsComponent projects={projects} />
}

const Projects: BlitzPage = () => {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsList />
    </Suspense>
  )
}

Projects.getLayout = (page) => <Layout title="CodeWithAnish - Projects">{page}</Layout>

export default Projects

// export const getServerSideProps: GetServerSideProps = gSSP(async (ctx) => {
//   const queryClient = new QueryClient()
//   const queryKey = getQueryKey(getProjects, null)
//   await getQueryClient().prefetchQuery(queryKey, () => invokeWithMiddleware(getProjects, null, ctx))
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// })
