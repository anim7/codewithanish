import Head from "next/head"
import { useSession } from "@blitzjs/auth"
import { useParam, BlitzPage, Routes } from "@blitzjs/next"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getTechnology from "app/technologies/queries/getTechnology"
import updateTechnology from "app/technologies/mutations/updateTechnology"
import { TechnologyForm, FORM_ERROR } from "app/technologies/components/TechnologyForm"
import { UpdateTechnologySchema } from "app/technologies/validation"

export const EditTechnologyComponent = () => {
  const router = useRouter()
  const session = useSession()
  const technologyId = useParam("technologyId", "number")
  const [technology, { setQueryData }] = useQuery(
    getTechnology,
    { id: technologyId },
    {
      staleTime: Infinity,
    }
  )
  const [updateTechnologyMutation] = useMutation(updateTechnology)

  if (session.role !== "ADMIN") {
    void router.push(Routes.Technologies())
  }

  if (session.role === "ADMIN")
    return (
      <>
        <Head>
          <title>Edit Technology {technology.id}</title>
        </Head>

        <div>
          <h1>Edit Technology {technology.id}</h1>
          <TechnologyForm
            submitText="Update Technology"
            schema={UpdateTechnologySchema}
            initialValues={technology}
            onSubmit={async (values) => {
              try {
                const updated = await updateTechnologyMutation(values)
                await setQueryData(updated)
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
      </>
    )
  else return <div className="min-h-screen" />
}

const EditTechnology: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen" />}>
        <EditTechnologyComponent />
      </Suspense>
    </div>
  )
}

EditTechnology.authenticate = true
EditTechnology.getLayout = (page) => <Layout>{page}</Layout>

export default EditTechnology
