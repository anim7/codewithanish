import { BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import HomeComponent from "app/core/components/home"

// const UserInfo = () => {
// const currentUser = useCurrentUser()
// const [logoutMutation] = useMutation(logout)
// if (currentUser) {
// } else {
// }
// }

const Home: BlitzPage = () => {
  return <HomeComponent />
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
