import { gSP } from "app/blitz-server"
import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import { Suspense } from "react"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import { ParsedUrlQuery } from "querystring"
import PostComponent from "app/posts/components/Post"
import { GetStaticPaths, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"

const Post: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div className="min-h-screen" />
  }
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
      <Suspense fallback={<div className="min-h-screen" />}>
        <PostComponent post={post} />
      </Suspense>
    </>
  )
}

Post.getLayout = (page) => <Layout>{page}</Layout>

export default Post

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = gSP(async ({ params, ctx }) => {
  const { slug } = params as Params
  const post = await getPost({ slug: slug }, ctx)
  return {
    props: { post: post },
    revalidate: 10,
  }
})
