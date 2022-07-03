import { Suspense } from "react"
import {
  Link,
  BlitzPage,
  Routes,
  QueryClient,
  getQueryKey,
  GetServerSideProps,
  invokeWithMiddleware,
  dehydrate,
  useQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnologies from "app/technologies/queries/getTechnologies"
import TechnologiesListComponent from "app/technologies/components/TechnologiesList"
import { Technology } from "@prisma/client"
import TechnologiesLoading from "app/technologies/components/TechnologiesLoading"

export const TechnologiesList = () => {
  const [{ technologies }] = useQuery(getTechnologies, {
    orderBy: { id: "asc" },
  })
  // const technologies: Technology[] = [
  //   {
  //     name: "Next.js",
  //     link: "https://nextjs.org/",
  //     logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
  //     desc: "Next.js is a react framework for building fullstack applications",
  //     invertInDarkMode: true,
  //   },
  //   {
  //     name: "Solidity",
  //     link: "https://docs.soliditylang.org/en/v0.8.14/",
  //     logo: "https://cdn.worldvectorlogo.com/logos/solidity.svg",
  //     desc: "Solidity is a programming for building ethereum smart contracts",
  //     invertInDarkMode: true,
  //   },
  //   {
  //     name: "Typescript",
  //     link: "https://www.typescriptlang.org/",
  //     logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  //     desc: "Typescript is a javascript superset with a type system for reducing runtime bugs",
  //     invertInDarkMode: false,
  //   },
  //   {
  //     name: "Go",
  //     link: "https://go.dev/",
  //     logo: "https://cdn.worldvectorlogo.com/logos/go-8.svg",
  //     desc: "Go is a compiled programming language",
  //     invertInDarkMode: false,
  //   },
  //   {
  //     name: "Tailwindcss",
  //     link: "https://tailwindcss.com/",
  //     logo: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
  //     desc: "Tailwindcss is a css framework for faster production",
  //     invertInDarkMode: false,
  //   },
  //   {
  //     name: "Gin",
  //     link: "https://github.com/gin-gonic/gin",
  //     logo: "https://avatars.githubusercontent.com/u/7894478?s=200&v=4",
  //     desc: "Gin is a go framework for building web applications",
  //     invertInDarkMode: false,
  //   },
  //   {
  //     name: "Blitz.js",
  //     link: "https://blitzjs.com/",
  //     logo: "https://avatars.githubusercontent.com/u/61243378?s=200&v=4",
  //     desc: "Blitz.js is a next.js framework for building fullstack api-less applications",
  //     invertInDarkMode: false,
  //   },
  //   {
  //     name: "Sass",
  //     link: "https://sass-lang.com/",
  //     logo: "https://github.com/devicons/devicon/raw/master/icons/sass/sass-original.svg",
  //     desc: "Sass is a css extension",
  //     invertInDarkMode: false,
  //   },
  //   {
  //     name: "MySQL",
  //     link: "https://www.mysql.com/",
  //     logo: "https://github.com/devicons/devicon/raw/master/icons/mysql/mysql-original.svg",
  //     desc: "MySQL is a relational database",
  //     invertInDarkMode: false,
  //   },
  // ]

  return <TechnologiesListComponent techs={technologies} />
}

const TechnologiesPage: BlitzPage = () => {
  return (
    <Suspense fallback={<TechnologiesLoading />}>
      <TechnologiesList />
    </Suspense>
  )
}

TechnologiesPage.getLayout = (page) => <Layout>{page}</Layout>

export default TechnologiesPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getTechnologies, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getTechnologies, null, ctx))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
