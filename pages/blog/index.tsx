import { gSSP } from "app/blitz-server"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { QueryClient, useQuery, getQueryKey, dehydrate } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import PostsComponent from "app/posts/components/Posts"
import getPosts from "app/posts/queries/getPosts"
import { Suspense } from "react"
import PostsLoading from "app/posts/components/PostsLoading"

export const PostsList = () => {
  const [{ posts }] = useQuery(getPosts, {
    orderBy: { id: "asc" },
  })
  return <PostsComponent posts={posts} />
}

const Posts: BlitzPage = () => {
  return (
    <Suspense fallback={<PostsLoading />}>
      <PostsList />
    </Suspense>
  )
}

Posts.getLayout = (page) => <Layout title="CodeWithAnish - Blog">{page}</Layout>
Posts.suppressFirstRenderFlicker = true

export default Posts

// export const getServerSideProps: GetServerSideProps = gSSP(async (ctx: GetServerSidePropsContext) => {
//   const queryClient = new QueryClient()
//   const queryKey = getQueryKey(getPosts, null)
//   await getQueryClient().prefetchQuery(queryKey, () => invokeWithMiddleware(getPosts, null, ctx))
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// })
