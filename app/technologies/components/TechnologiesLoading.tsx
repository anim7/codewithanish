import React from "react"
import { motion } from "framer-motion"

const TechnologiesLoading: React.FunctionComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.02 }}
      className="flex flex-col items-center min-h-screen p-6 ml-12 sm:ml-0"
    >
      <h1 className="text-black dark:text-white text-[2rem] font-bold">My Tech Stack</h1>
      <div className="grid items-center justify-center w-full gap-4 p-4 pl-12 grid-cols-posts">
        {Array(12)
          .fill(12)
          .map((_, key) => {
            return (
              <div
                key={key}
                className="bg-white rounded shadow-xl cursor-pointer animate-pulse dark:bg-slate-900 dark:shadow-sm dark:shadow-slate-800 dark:border-slate-800 dark:border"
              >
                <div className="flex items-center w-16 h-16 pl-1">
                  <div className="w-[50px] h-[50px] bg-gray-300 dark:bg-slate-800" />
                </div>
                <div className="w-full">
                  <div className="flex w-full pl-1 mb-3">
                    <div className="h-[0.5rem] w-[4rem] rounded bg-gray-300 dark:bg-slate-800 mr-1" />
                    <div className="h-[0.5rem] w-[6rem] rounded bg-gray-300 dark:bg-slate-800" />
                  </div>
                  <div className="flex flex-col w-full p-1">
                    <div className="flex justify-between w-full mb-2">
                      <div className="w-[46%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                      <div className="w-[36%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                      <div className="w-[16%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                    </div>
                    <div className="flex justify-between w-full mb-2">
                      <div className="w-[58%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                      <div className="w-[40%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                    </div>
                    <div className="flex justify-between w-full mb-2">
                      <div className="w-[36%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                      <div className="w-[72%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                    </div>
                    <div className="flex justify-between w-full mb-2">
                      <div className="w-[43%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                      <div className="w-[55%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                    </div>
                    <div className="flex w-full">
                      <div className="w-[23%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800 mr-1" />
                      <div className="w-[33%] h-[0.4rem] rounded bg-gray-300 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </motion.div>
  )
}

export default TechnologiesLoading
