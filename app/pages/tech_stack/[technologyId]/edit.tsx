import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnology from "app/technologies/queries/getTechnology"
import updateTechnology from "app/technologies/mutations/updateTechnology"
import { TechnologyForm, FORM_ERROR } from "app/technologies/components/TechnologyForm"

export const EditTechnology = () => {
  const router = useRouter()
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
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTechnology}
          initialValues={technology}
          onSubmit={async (values) => {
            try {
              const updated = await updateTechnologyMutation({
                id: technology.id,
                ...values,
              })
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
}

const EditTechnologyPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTechnology />
      </Suspense>

      <p>
        <Link href={Routes.TechnologiesPage()}>
          <a>Technologies</a>
        </Link>
      </p>
    </div>
  )
}

EditTechnologyPage.authenticate = true
EditTechnologyPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTechnologyPage
