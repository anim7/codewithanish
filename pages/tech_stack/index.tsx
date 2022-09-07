import { gSP } from "app/blitz-server"
import { InferGetStaticPropsType } from "next"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getTechnologies from "app/technologies/queries/getTechnologies"
import TechnologiesListComponent from "app/technologies/components/TechnologiesList"
import TechnologiesLoading from "app/technologies/components/TechnologiesLoading"
import { Technology } from "@prisma/client"

const Technologies: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  technologies,
}) => {
  return (
    <Suspense fallback={<TechnologiesLoading />}>
      <TechnologiesListComponent techs={technologies} />
    </Suspense>
  )
}

Technologies.getLayout = (page) => <Layout>{page}</Layout>

export default Technologies

export const getStaticProps = gSP(async ({ ctx }) => {
  const res = await getTechnologies({}, ctx)
  const technologies: Technology[] = res.technologies
  return {
    props: { technologies },
    revalidate: 10,
  }
})
