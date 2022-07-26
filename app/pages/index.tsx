import { BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import HomeComponent from "app/core/components/home"

const Home: BlitzPage = () => {
  return <HomeComponent />
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="CodeWithAnish - Home">{page}</Layout>

export default Home
