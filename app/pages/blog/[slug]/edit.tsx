import { Suspense, useState } from "react"
import {
  Head,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  useSession,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/posts/queries/getPost"
import updatePost from "app/posts/mutations/updatePost"
import { PostForm, FORM_ERROR } from "app/posts/components/PostForm"
import { updatePostSchema } from "app/posts/validation"

export const EditPost = () => {
  const router = useRouter()
  const slug = useParam("slug", "string")
  const session = useSession()
  const [richText, setRichText] = useState("")
  const [post, { setQueryData }] = useQuery(
    getPost,
    { slug: slug },
    {
      staleTime: Infinity,
    }
  )
  const [updatePostMutation] = useMutation(updatePost)

  if (session.role !== "ADMIN") {
    router.push(Routes.PostsPage())
  }

  if (session.role === "ADMIN")
    return (
      <>
        <Head>
          <title>Edit Post {post.id}</title>
        </Head>

        <div>
          <h1>Edit Post {post.id}</h1>
          <pre>{JSON.stringify(post, null, 2)}</pre>

          <PostForm
            submitText="Update Post"
            value={richText}
            setValue={setRichText}
            schema={updatePostSchema}
            initialValues={post}
            onSubmit={async (values) => {
              try {
                const updated = await updatePostMutation(values)
                await setQueryData(updated)
                router.push(Routes.ShowPostPage({ slug: updated.slug }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </div>
      </>
    )
  else return <div className="min-h-screen" />
}

const EditPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen" />}>
        <EditPost />
      </Suspense>
    </div>
  )
}

EditPostPage.authenticate = true
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPostPage
