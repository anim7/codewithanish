import React from "react"
import { motion } from "framer-motion"

const ProjectsLoading: React.FunctionComponent = () => {
  const keys = [1, 2, 3, 4, 5, 6]
  return (
    <motion.div
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center min-h-screen ml-12 sm:ml-0"
    >
      <h1 className="text-[2rem] font-bold text-black dark:text-white mt-2">Projects</h1>
      <div className="flex flex-col items-center max-w-[50rem]">
        {keys.map((key) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.02 }}
              key={key}
              className="h-[12rem] flex w-full animate-pulse border-[1.5px] rounded-2xl p-2 border-gray-300 dark:border-slate-800 shadow-xl dark:shadow-sm dark:shadow-slate-800 my-2"
            >
              <div className="h-full w-[18rem] relative dark:bg-slate-800 bg-gray-300 overflow-hidden" />
              <div className="flex flex-col mt-3 ml-4">
                <div className="w-[6rem] h-3 dark:bg-slate-800 bg-gray-300 rounded-xl mb-[0.37rem]" />
                <div className="flex">
                  <div className="dark:bg-slate-800 bg-gray-300 w-[5rem] h-2 mr-[0.125rem] rounded" />
                  <div className="dark:bg-slate-800 bg-gray-300 w-[3rem] h-2 rounded" />
                </div>
                <div className="flex flex-wrap mt-4">
                  <div className="flex items-center mr-6">
                    <div className="w-6 h-6 mr-1 bg-gray-300 rounded-full dark:bg-slate-900" />
                    <div className="w-[8rem] h-2 bg-gray-300 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="flex items-center mr-32">
                    <div className="w-6 h-6 mr-1 bg-gray-300 rounded-full dark:bg-slate-900" />
                    <div className="w-[8rem] h-2 bg-gray-300 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default ProjectsLoading
