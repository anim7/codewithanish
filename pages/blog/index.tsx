import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import PostsComponent from "app/posts/components/Posts"
import getPosts from "app/posts/queries/getPosts"
import { Suspense } from "react"
import PostsLoading from "app/posts/components/PostsLoading"
import { gSP } from "app/blitz-server"
import { Post } from "@prisma/client"
import { InferGetStaticPropsType } from "next"

const Posts: BlitzPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <Suspense fallback={<PostsLoading />}>
      <PostsComponent posts={posts} />
    </Suspense>
  )
}

Posts.getLayout = (page) => <Layout title="CodeWithAnish - Blog">{page}</Layout>
Posts.suppressFirstRenderFlicker = true

export default Posts

export const getStaticProps = gSP(async ({ ctx }) => {
  const res = await getPosts({}, ctx)
  const posts: Post[] = res.posts
  return { props: { posts }, revalidate: 10 }
})
