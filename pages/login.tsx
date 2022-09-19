import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const Login: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={async (_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          await router.push(next)
        }}
      />
    </div>
  )
}

Login.redirectAuthenticatedTo = "/"
Login.getLayout = (page) => <Layout title="CodeWithAnish - Log In">{page}</Layout>

export default Login
