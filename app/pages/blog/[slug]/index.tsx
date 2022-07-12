import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
  GetServerSideProps,
  QueryClient,
  getQueryKey,
  invokeWithMiddleware,
  useParams,
  dehydrate,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import { ParsedUrlQuery } from "querystring"
import PostComponent from "app/posts/components/Post"

export const Post = () => {
  const slug = useParam("slug", "string")
  const [post] = useQuery(getPost, { slug: slug })

  return <PostComponent post={post} />
}

const ShowPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const { slug } = ctx.params as Params
  const queryKey = getQueryKey(getPost, { slug: slug })
  await queryClient.prefetchQuery(queryKey, () =>
    invokeWithMiddleware(getPost, { slug: slug }, ctx)
  )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
