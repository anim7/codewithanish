import { Post } from "@prisma/client"
import React from "react"
import PostLink from "./PostLink"
import { motion } from "framer-motion"

interface Props {
  posts: Post[]
}

const Posts: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <motion.main
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center min-h-screen py-6 ml-12 dark:text-white sm:ml-0"
    >
      <h2 className="text-[2rem] font-bold">Blog</h2>
      <div className="grid items-center justify-center w-full gap-4 p-4 pl-12 grid-cols-posts sm:pl-8">
        {posts.map((post, key) => {
          return <PostLink post={post} key={key} />
        })}
      </div>
    </motion.main>
  )
}

export default Posts
