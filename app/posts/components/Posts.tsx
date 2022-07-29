import { Post } from "@prisma/client"
import React from "react"
import PostLink from "./PostLink"
import { motion } from "framer-motion"
import { Link, Routes, useSession } from "blitz"

interface Props {
  posts: Post[]
}

const Posts: React.FunctionComponent<Props> = ({ posts }) => {
  const session = useSession()
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
        {session.role === "ADMIN" && (
          <Link href={Routes.NewPostPage()}>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.02 }}
              className="w-72 h-[25rem] shadow-xl dark:shadow-sm dark:shadow-slate-800 dark:border-slate-800 dark:border rounded-2xl cursor-pointer dark:bg-slate-900 bg-white flex items-center justify-center font-extralight text-gray-300 dark:text-slate-700 text-[8rem]"
            >
              +
            </motion.a>
          </Link>
        )}
      </div>
    </motion.main>
  )
}

export default Posts
