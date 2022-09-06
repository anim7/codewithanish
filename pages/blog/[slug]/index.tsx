import { gSSP } from "app/blitz-server"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { useParam, BlitzPage } from "@blitzjs/next"
import { useQuery, QueryClient, getQueryKey, dehydrate } from "@blitzjs/rpc"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import { ParsedUrlQuery } from "querystring"
import PostComponent from "app/posts/components/Post"

export const PostComp = () => {
  const slug = useParam("slug", "string")
  const [post] = useQuery(getPost, { slug: slug })

  return (
    <>
      <Head>
        <title>CodeWithAnish - {post.title}</title>
        <meta name="description" content={post.summary} />
        <meta name="og:title" content={post.title} />
        <meta name="og:description" content={post.summary} />
        <meta name="og:image" content={post.image} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content={post.metaTitle} />
      </Head>
      <PostComponent post={post} />
    </>
  )
}

const Post: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen" />}>
        <PostComp />
      </Suspense>
    </div>
  )
}

Post.getLayout = (page) => <Layout>{page}</Layout>

export default Post

interface Params extends ParsedUrlQuery {
  slug: string
}

// export const getServerSideProps: GetServerSideProps = gSSP(async (ctx) => {
//   const queryClient = new QueryClient()
//   const { slug } = ctx.params as Params
//   const queryKey = getQueryKey(getPost, { slug: slug })
//   await getQueryClient().prefetchQuery(queryKey, () =>
//     invokeWithMiddleware(getPost, { slug: slug }, ctx)
//   )
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// })
