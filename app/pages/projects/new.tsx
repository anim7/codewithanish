import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProject from "app/projects/mutations/createProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { createProjectSchema } from "app/projects/validation"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)

  return (
    <div>
      <h1 className="text-[2rem] text-black dark:text-white font-bolder">Create New Project</h1>
      <ProjectForm
        submitText="Create Project"
        schema={createProjectSchema}
        initialValues={{
          description: "",
          title: "",
          image: "",
          keywords: "",
          link1: "",
          link2: "",
          slug: "",
          summary: "",
        }}
        onSubmit={async (values) => {
          try {
            const project = await createProjectMutation(values)
            router.push(Routes.ShowProjectPage({ slug: project.slug }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => (
  <Layout title={"CodeWithAnish - Create New Project"}>{page}</Layout>
)

export default NewProjectPage
