import {
  BlitzPage,
  QueryClient,
  useQuery,
  GetServerSideProps,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  getQueryKey,
  dehydrate,
  GetStaticProps,
  GetStaticPropsContext,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import Posts from "app/posts/components/Posts"
import getPosts from "app/posts/queries/getPosts"
import { Suspense, useContext } from "react"
import PostsLoading from "app/posts/components/PostsLoading"

export const PostsList = () => {
  // const { setProgress } = useContext(ProgressContext)
  // setProgress(0)
  // setProgress(40)
  // const [{ posts }] = useQuery(getPosts, {
  //   orderBy: { id: "asc" },
  //   skip: 0,
  //   take: ITEMS_PER_PAGE,
  // })
  // setProgress(100)
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
