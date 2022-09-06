import { gSSP } from "app/blitz-server"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { useParam, BlitzPage } from "@blitzjs/next"
import { useQuery, QueryClient, getQueryKey, dehydrate } from "@blitzjs/rpc"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import { ParsedUrlQuery } from "querystring"
import ProjectComponent from "app/projects/components/Project"

export const ProjectComp = () => {
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

const Project: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectComp />
    </Suspense>
  )
}

Project.getLayout = (page) => <Layout>{page}</Layout>

export default Project

interface Params extends ParsedUrlQuery {
  slug: string
}

// export const getServerSideProps: GetServerSideProps = gSSP(async (ctx) => {
//   const queryClient = new QueryClient()
//   const { slug } = ctx.params as Params
//   const queryKey = getQueryKey(getProject, { slug: slug })
//   await getQueryClient().prefetchQuery(queryKey, () =>
//     invokeWithMiddleware(getProject, { slug: slug }, ctx)
//   )
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// })
