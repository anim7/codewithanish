import { gSP } from "app/blitz-server"
import Head from "next/head"
import { GetStaticPaths, InferGetStaticPropsType } from "next"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import { ParsedUrlQuery } from "querystring"
import ProjectComponent from "app/projects/components/Project"

const Project: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ project }) => {
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
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProjectComponent project={project} />
      </Suspense>
    </>
  )
}

Project.getLayout = (page) => <Layout>{page}</Layout>

export default Project

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = gSP(async ({ params, ctx }) => {
  const { slug } = params as Params
  const project = await getProject({ slug: slug }, ctx)
  return {
    props: { project: project },
    revalidate: 10,
  }
})
