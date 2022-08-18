import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import updateProject from "app/projects/mutations/updateProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { createProjectSchema } from "app/projects/validation"

export const EditProject = () => {
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
              router.push(Routes.ShowProjectPage({ slug: updated.slug }))
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

const EditProjectPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <EditProject />
    </Suspense>
  )
}

EditProjectPage.authenticate = true
EditProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProjectPage
