import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import createProject from "app/projects/mutations/createProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { createProjectSchema } from "app/projects/validation"
import { useSession } from "@blitzjs/auth"

const NewProject: BlitzPage = () => {
  const router = useRouter()
  const session = useSession()
  const [createProjectMutation] = useMutation(createProject)

  if (session.role !== "ADMIN") {
    void router.push(Routes.Posts())
  }

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
            await router.push(Routes.Project({ slug: project.slug }))
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

NewProject.authenticate = true
NewProject.getLayout = (page) => (
  <Layout title={"CodeWithAnish - Create New Project"}>{page}</Layout>
)

export default NewProject
