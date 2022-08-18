import Link from "next/link"
import { useSession } from "blitz"
import { useMutation } from "blitz"
import { Routes } from "blitz"
import { Post } from "@prisma/client"
import React, { useEffect, useState } from "react"
import PostLink from "./PostLink"
import { motion } from "framer-motion"
import type Position from "app/types/position"
import deletePost from "../mutations/deletePost"
import ContextMenu from "app/core/components/menu"

interface Props {
  posts: Post[]
}

const Posts: React.FunctionComponent<Props> = ({ posts }) => {
  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside)
    return () => {
      document.body.removeEventListener("click", handleClickOutside)
    }
  }, [])
  const session = useSession()
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clickedId, setClickedId] = useState<number>(0)
  const [p, setP] = useState<Post[]>(posts)
  const [deletePostMutation] = useMutation(deletePost)

  const handleDelete = async () => {
    await deletePostMutation({ id: clickedId })
    setVisible(false)
    setP(p.filter((post) => post.id !== clickedId))
  }

  const handleClickOutside = () => {
    setVisible(false)
  }
  return (
    <>
      <motion.main
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center min-h-screen py-6 ml-12 dark:text-white sm:ml-0"
      >
        <h1 className="text-[2rem] text-black dark:text-white font-bold">Blog</h1>
        <div className="grid items-center justify-center w-full gap-4 p-4 pl-12 grid-cols-posts sm:pl-8">
          {p.map((post, key) => {
            return (
              <PostLink
                post={post}
                key={key}
                onContextMenu={(e) => {
                  if (session.role === "ADMIN") {
                    e.preventDefault()
                    setPosition({ x: e.pageX, y: e.pageY })
                    setClickedId(post.id)
                    setVisible(true)
                  }
                }}
              />
            )
          })}
          {session.role === "ADMIN" && (
            <Link href={Routes.NewPostPage()} passHref>
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
      {visible && (
        <ContextMenu
          position={position}
          handleDelete={handleDelete}
          editPageHref={Routes.EditPostPage({
            slug: p.filter((post) => post.id === clickedId)[0]!.slug,
          })}
        />
      )}
    </>
  )
}

export default Posts
