import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Post } from "@prisma/client"
import Button from "app/core/components/button"
import React from "react"
import getDate from "../../utils/dateutils"
import deletePost from "../mutations/deletePost"
import styles from "../styles/Post.module.scss"
import "highlight.js/styles/night-owl.css"

interface Props {
  post: Post
}

const PostComponent: React.FunctionComponent<Props> = ({ post }) => {
  const session = useSession()
  const router = useRouter()
  const [deletePostMutation] = useMutation(deletePost)
  const handleDelete = async () => {
    await deletePostMutation({ id: post.id })
    await router.push(Routes.Posts())
  }
  const handleEdit = () => {
    void router.push(Routes.EditPost({ slug: post.slug }))
  }
  return (
    <div
      className={`${styles.container} flex flex-col items-center min-h-screen p-4 px-20 ml-12 sm:px-3 sm:ml-0`}
    >
      <h1 className="text-[2rem] font-bold text-black dark:text-white">{post.title}</h1>
      <article className="flex flex-col items-center w-full mt-4">
        <div
          className="text-[1.2rem] text-black dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <p className="text-black dark:text-gray-300 mt-1 text-right text-[0.9rem] self-end">
          {getDate(post.publishedAt)}
        </p>
      </article>
      {session.role === "ADMIN" && (
        <>
          <Button width="10rem" bg="#e60000" bgHover="red" onClick={handleDelete} marginY="0.2rem">
            Delete
          </Button>
          <Button
            width="10rem"
            bg="rgb(0 111 230)"
            bgHover="#007bff"
            onClick={handleEdit}
            marginY="0.2rem"
          >
            Edit
          </Button>
        </>
      )}
    </div>
  )
}

export default PostComponent
