import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import createPost from "app/posts/mutations/createPost"
import { PostForm, FORM_ERROR } from "app/posts/components/PostForm"
import { createPostSchema } from "app/posts/validation"
import { Suspense, useState } from "react"

const NewPostComponent = () => {
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)
  const session = useSession()
  const [richText, setRichText] = useState("")

  if (session.role !== "ADMIN") {
    void router.push(Routes.Posts())
  }

  if (session.role === "ADMIN")
    return (
      <div>
        <h1 className="ml-[3.75rem] sm:ml-3 text-[2rem] text-black dark:text-white font-bolder">
          Create New Post
        </h1>
        <PostForm
          submitText="Create Post"
          schema={createPostSchema}
          value={richText}
          setValue={setRichText}
          initialValues={{
            content: "",
            image: "",
            metaTitle: "",
            published: false,
            title: "",
            slug: "",
            summary: "",
            userId: 1,
          }}
          onSubmit={async (values) => {
            try {
              values.content = richText
              values.published = true
              values.userId = session.userId || 1
              const post = await createPostMutation(values)
              await router.push(Routes.Post({ slug: post.slug }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />

        <p>
          <Link href={Routes.Posts()}>
            <a>Posts</a>
          </Link>
        </p>
      </div>
    )
  else return <div className="min-h-screen" />
}

const NewPost: BlitzPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <NewPostComponent />
    </Suspense>
  )
}

NewPost.authenticate = true
NewPost.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPost
