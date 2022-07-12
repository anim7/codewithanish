import { Post } from "@prisma/client"
import React from "react"
import getDate from "../../utils/dateutils"
import styles from "../styles/Post.module.scss"

interface Props {
  post: Post
}

const PostComponent: React.FunctionComponent<Props> = ({ post }) => {
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
    </div>
  )
}

export default PostComponent
