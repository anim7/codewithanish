import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import createProject from "app/projects/mutations/createProject"
import { ProjectForm, FORM_ERROR } from "app/projects/components/ProjectForm"
import { createProjectSchema } from "app/projects/validation"
import { useSession } from "@blitzjs/auth"
import { Suspense, useState } from "react"

const NewProjectComponent: React.FunctionComponent = () => {
  const router = useRouter()
  const session = useSession()
  const [createProjectMutation] = useMutation(createProject)
  const [richText, setRichText] = useState("")

  if (session.role !== "ADMIN") {
    void router.push(Routes.Posts())
  }

  if (session.role === "ADMIN")
    return (
      <div>
        <h1 className="ml-[3.75rem] sm:ml-3 text-[2rem] text-black dark:text-white font-bolder">
          Create New Project
        </h1>
        <ProjectForm
          submitText="Create Project"
          schema={createProjectSchema}
          value={richText}
          setValue={setRichText}
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
              values.description = richText
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
  else return <div className="min-h-screen" />
}

const NewProject: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <NewProjectComponent />
    </Suspense>
  )
}

NewProject.authenticate = true
NewProject.getLayout = (page) => (
  <Layout title={"CodeWithAnish - Create New Project"}>{page}</Layout>
)

export default NewProject
