import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTechnology from "app/technologies/mutations/createTechnology"
import { TechnologyForm, FORM_ERROR } from "app/technologies/components/TechnologyForm"
import { CreateTechnologySchema } from "app/technologies/validation"

const NewTechnologyPage: BlitzPage = () => {
  const router = useRouter()
  const [createTechnologyMutation] = useMutation(createTechnology)

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
            const technology = await createTechnologyMutation(values)
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
}

NewTechnologyPage.authenticate = true
NewTechnologyPage.getLayout = (page) => <Layout title={"Create New Technology"}>{page}</Layout>

export default NewTechnologyPage
