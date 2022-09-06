import Head from "next/head"
import Link from "next/link"
import { useParam, BlitzPage, Routes } from "@blitzjs/next"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import updateProject from "app/projects/mutations/updateProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { createProjectSchema } from "app/projects/validation"
import { useSession } from "@blitzjs/auth"

export const EditProjectComponent = () => {
  const router = useRouter()
  const slug = useParam("slug", "string")
  const [project, { setQueryData }] = useQuery(
    getProject,
    { slug: slug },
    {
      staleTime: Infinity,
    }
  )
  const [updateProjectMutation] = useMutation(updateProject)
  const session = useSession()

  if (session.role !== "ADMIN") {
    void router.push(Routes.Posts())
  }

  return (
    <>
      <Head>
        <title>CodeWithAnish - Edit Project {project.title}</title>
      </Head>

      <div>
        <h1>Edit Project {project.id}</h1>
        <ProjectForm
          submitText="Update Project"
          schema={createProjectSchema}
          initialValues={project}
          onSubmit={async (values) => {
            try {
              const updated = await updateProjectMutation({
                id: project.id,
                ...values,
              })
              await setQueryData(updated)
              await router.push(Routes.Project({ slug: updated.slug }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditProject: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <EditProjectComponent />
    </Suspense>
  )
}

EditProject.authenticate = true
EditProject.getLayout = (page) => <Layout>{page}</Layout>

export default EditProject
