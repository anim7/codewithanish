import React from "react"
import { motion } from "framer-motion"

const PostsLoading: React.FunctionComponent = () => {
  const keys = [1, 2, 3, 4, 5, 6]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.02 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen py-6 ml-12 dark:text-white"
    >
      <div className="text-[2rem] font-bold">Blog</div>
      <div className="grid items-center justify-center w-full gap-4 p-4 pl-12 grid-cols-posts">
        {keys.map((key) => (
          <div
            key={key}
            className="animate-pulse shadow-xl dark:shadow-sm bg-white dark:shadow-slate-800 dark:border-slate-800 dark:border w-72 h-[25rem] rounded-2xl cursor-pointer dark:bg-slate-900"
          >
            <div>
              <div className="relative w-full bg-gray-300 h-44 dark:bg-slate-800 rounded-t-2xl" />
              <div className="p-4 flex items-center flex-col h-[10.5rem]">
                <div className="flex justify-between w-full mb-3">
                  <div className="h-[0.6rem] w-[73%] bg-gray-300 dark:bg-slate-800 rounded" />
                  <div className="h-[0.6rem] w-[23%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="flex justify-start w-full mb-5">
                  <div className="h-[0.6rem] w-[43%] bg-gray-300 dark:bg-slate-800 rounded mr-3" />
                  <div className="h-[0.6rem] w-[33%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="flex justify-between w-full mb-[0.6rem]">
                  <div className="h-2 w-[83%] bg-gray-300 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-[13%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="flex justify-between w-full mb-[0.6rem]">
                  <div className="h-2 w-[63%] bg-gray-300 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-[33%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="flex justify-between w-full mb-[0.6rem]">
                  <div className="h-2 w-[23%] bg-gray-300 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-[73%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="flex justify-between w-full mb-[0.6rem]">
                  <div className="h-2 w-[43%] bg-gray-300 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-[53%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="flex justify-between w-full mb-[3.25rem]">
                  <div className="h-2 w-[36%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
                <div className="w-full">
                  <div className="h-2 w-[55%] bg-gray-300 dark:bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default PostsLoading
