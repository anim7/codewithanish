// import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
// import { useCurrentUser } from "app/core/hooks/useCurrentUser"
// import logout from "app/auth/mutations/logout"
import HomeComponent from "app/core/components/home"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

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
