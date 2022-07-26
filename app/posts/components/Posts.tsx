import { Post } from "@prisma/client"
import React, { useEffect, useState } from "react"
import PostLink from "./PostLink"
import { motion } from "framer-motion"
import { Link, Routes, useMutation, useSession } from "blitz"
import type Position from "app/types/position"
import deletePost from "../mutations/deletePost"
import Button from "app/core/components/button"

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
        <h2 className="text-[2rem] font-bold">Blog</h2>
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
      {visible && (
        <ul style={{ top: `${position.y}px`, left: `${position.x}px`, position: "absolute" }}>
          <li>
            <Button onClick={handleDelete} width="10rem" bg="#e60000" bgHover="red">
              Delete
            </Button>
          </li>
        </ul>
      )}
    </>
  )
}

export default Posts
