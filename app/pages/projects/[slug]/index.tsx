import { Suspense } from "react"
import {
  Head,
  useQuery,
  useParam,
  BlitzPage,
  GetServerSideProps,
  QueryClient,
  getQueryKey,
  invokeWithMiddleware,
  dehydrate,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import { ParsedUrlQuery } from "querystring"
import ProjectComponent from "app/projects/components/Project"

export const Project = () => {
  const slug = useParam("slug", "string")
  const [project] = useQuery(getProject, { slug: slug })

  return (
    <>
      <Head>
        <title>CodeWithAnish - {project.title}</title>
        <meta name="description" content={project.summary} />
        <meta name="og:title" content={project.title} />
        <meta name="og:description" content={project.summary} />
        <meta name="og:image" content={project.image} />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.summary} />
        <meta name="twitter:image" content={project.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content={project.keywords} />
      </Head>
      <ProjectComponent project={project} />
    </>
  )
}

const ShowProjectPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Project />
    </Suspense>
  )
}

ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const { slug } = ctx.params as Params
  const queryKey = getQueryKey(getProject, { slug: slug })
  await queryClient.prefetchQuery(queryKey, () =>
    invokeWithMiddleware(getProject, { slug: slug }, ctx)
  )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
