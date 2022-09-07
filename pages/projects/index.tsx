import { gSP } from "app/blitz-server"
import { InferGetStaticPropsType } from "next"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import ProjectsComponent from "app/projects/components/Projects"
import ProjectsLoading from "app/projects/components/ProjectsLoading"
import { Project } from "@prisma/client"

const Projects: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsComponent projects={projects} />
    </Suspense>
  )
}

Projects.getLayout = (page) => <Layout title="CodeWithAnish - Projects">{page}</Layout>

export default Projects

export const getStaticProps = gSP(async ({ ctx }) => {
  const res = await getProjects({}, ctx)
  const projects: Project[] = res.projects
  return {
    props: { projects: projects },
    revalidate: 10,
  }
})
