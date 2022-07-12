import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  useSession,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnology from "app/technologies/queries/getTechnology"
import updateTechnology from "app/technologies/mutations/updateTechnology"
import { TechnologyForm, FORM_ERROR } from "app/technologies/components/TechnologyForm"
import { UpdateTechnologySchema } from "app/technologies/validation"

export const EditTechnology = () => {
  const router = useRouter()
  const session = useSession()
  const technologyId = useParam("technologyId", "number")
  const [technology, { setQueryData }] = useQuery(
    getTechnology,
    { id: technologyId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTechnologyMutation] = useMutation(updateTechnology)

  if (session.role !== "ADMIN") {
    router.push(Routes.TechnologiesPage())
  }

  if (session.role === "ADMIN")
    return (
      <>
        <Head>
          <title>Edit Technology {technology.id}</title>
        </Head>

        <div>
          <h1>Edit Technology {technology.id}</h1>
          <pre>{JSON.stringify(technology, null, 2)}</pre>

          <TechnologyForm
            submitText="Update Technology"
            schema={UpdateTechnologySchema}
            initialValues={technology}
            onSubmit={async (values) => {
              try {
                const updated = await updateTechnologyMutation(values)
                await setQueryData(updated)
                router.push(Routes.TechnologiesPage())
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

const EditTechnologyPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen" />}>
        <EditTechnology />
      </Suspense>
    </div>
  )
}

EditTechnologyPage.authenticate = true
EditTechnologyPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTechnologyPage
