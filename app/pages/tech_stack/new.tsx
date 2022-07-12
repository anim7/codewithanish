import { Link, useRouter, useMutation, BlitzPage, Routes, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTechnology from "app/technologies/mutations/createTechnology"
import { TechnologyForm, FORM_ERROR } from "app/technologies/components/TechnologyForm"
import { CreateTechnologySchema } from "app/technologies/validation"
import React, { Suspense } from "react"

const NewTechnologyComponent: React.FunctionComponent = () => {
  const router = useRouter()
  const session = useSession()
  const [createTechnologyMutation] = useMutation(createTechnology)

  if (session.role !== "ADMIN") {
    router.push(Routes.TechnologiesPage())
  }

  if (session.role === "ADMIN")
    return (
      <div>
        <h1>Create New Technology</h1>

        <TechnologyForm
          submitText="Add Tech"
          schema={CreateTechnologySchema}
          initialValues={{
            name: "",
            link: "",
            logo: "",
            desc: "",
            invertInDarkMode: false,
          }}
          onSubmit={async (values) => {
            try {
              await createTechnologyMutation(values)
              router.push(Routes.TechnologiesPage())
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />

        <p>
          <Link href={Routes.TechnologiesPage()}>
            <a>Technologies</a>
          </Link>
        </p>
      </div>
    )
  else return <div className="min-h-screen" />
}

const NewTechnologyPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <NewTechnologyComponent />
    </Suspense>
  )
}

NewTechnologyPage.authenticate = true
NewTechnologyPage.getLayout = (page) => <Layout title={"Create New Technology"}>{page}</Layout>

export default NewTechnologyPage
