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
  const [post, { setQueryData }] = useQuery(
    getPost,
    { slug: slug },
    {
      staleTime: Infinity,
    }
  )
  const [updatePostMutation] = useMutation(updatePost)
  const [richText, setRichText] = useState(post.content)
  if (session.role !== "ADMIN") {
    router.push(Routes.PostsPage())
  }

  if (session.role === "ADMIN")
    return (
      <>
        <Head>
          <title>CodeWithAnish - Edit Post {post.title}</title>
        </Head>

        <div>
          <h1 className="text-black dark:text-white text-[2rem] ml-12 sm:ml-0 text-center">
            Edit Post {post.id}
          </h1>
          <PostForm
            submitText="Update Post"
            value={post.content}
            setValue={setRichText}
            schema={updatePostSchema}
            initialValues={post}
            onSubmit={async (values) => {
              try {
                values.content = richText
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
