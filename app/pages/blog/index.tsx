import {
  BlitzPage,
  QueryClient,
  useQuery,
  GetServerSideProps,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  getQueryKey,
  dehydrate,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import Posts from "app/posts/components/Posts"
import getPosts from "app/posts/queries/getPosts"
import { Suspense } from "react"
import PostsLoading from "app/posts/components/PostsLoading"

export const PostsList = () => {
  const [{ posts }] = useQuery(getPosts, {
    orderBy: { id: "asc" },
  })
  return <Posts posts={posts} />
}

const PostsPage: BlitzPage = () => {
  return (
    <Suspense fallback={<PostsLoading />}>
      <PostsList />
    </Suspense>
  )
}

PostsPage.getLayout = (page) => <Layout title="CodeWithAnish - Blog">{page}</Layout>
PostsPage.suppressFirstRenderFlicker = true

export default PostsPage

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getPosts, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getPosts, null, ctx))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
