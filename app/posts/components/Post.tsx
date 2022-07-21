import { Post } from "@prisma/client"
import Button from "app/core/components/button"
import { Routes, useMutation, useRouter, useSession } from "blitz"
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
    router.push(Routes.PostsPage())
  }
  return (
    <div
      className={`${styles.container} flex flex-col items-center min-h-screen p-4 px-20 ml-12 sm:px-0 sm:ml-0`}
    >
      <h2 className="text-[2rem] font-bold text-black dark:text-white">{post.title}</h2>
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
        <Button width="10rem" bg="#e60000" bgHover="red" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </div>
  )
}

export default PostComponent
