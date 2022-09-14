import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
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
    void router.push(Routes.Technologies())
  }

  if (session.role === "ADMIN")
    return (
      <div>
        <h1 className="ml-[3.75rem] sm:ml-3 text-[2rem] text-black dark:text-white font-bolder">
          Create New Technology
        </h1>

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
              await router.push(Routes.Technologies())
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

const NewTechnology: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <NewTechnologyComponent />
    </Suspense>
  )
}

NewTechnology.authenticate = true
NewTechnology.getLayout = (page) => <Layout title={"Create New Technology"}>{page}</Layout>

export default NewTechnology
