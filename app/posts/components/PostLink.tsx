import { Post } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import getDate from "../../utils/dateutils"
import { motion } from "framer-motion"
import { Routes } from "blitz"

interface Props {
  post: Post
}

const PostLink: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <Link href={Routes.ShowPostPage({ slug: post.slug })} passHref>
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.02 }}
        className="w-72 h-[25rem] shadow-xl dark:shadow-sm dark:shadow-slate-800 dark:border-slate-800 dark:border rounded-2xl cursor-pointer dark:bg-slate-900 bg-white"
      >
        <article>
          <div className="w-full h-44 relative bg-[#04031b] rounded-t-2xl">
            {post.image && post.image.length > 0 && (
              <Image src={post.image} alt={post.title} layout="fill" objectFit="contain" />
            )}
          </div>
          <div className="p-4 flex items-center flex-col h-[10.5rem]">
            <h3 className="text-[1.2rem] font-bold text-black dark:text-gray-300">{post.title}</h3>
            <p className="text-black dark:text-gray-300">{post.summary}</p>
          </div>
          <div className="flex items-center flex-wrap p-4 text-[#494949] dark:text-gray-500 text-[0.9rem]">
            <time dateTime={`${new Date(post.publishedAt)}`}>{getDate(post.publishedAt)}</time>
            <div className="rounded-[50%] w-[0.3rem] h-[0.3rem] bg-[#808080] mx-[0.4rem]"></div>
            <time dateTime={`${post.timeToRead}M`}>
              {post.timeToRead !== 1 ? `${post.timeToRead} mins` : `${post.timeToRead} min`}
            </time>
          </div>
        </article>
      </motion.a>
    </Link>
  )
}

export default PostLink
