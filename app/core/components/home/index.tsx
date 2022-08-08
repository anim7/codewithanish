import React from "react"
import Background from "../background"
import { motion } from "framer-motion"

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Background />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center min-h-screen p-4 ml-12 sm:ml-0"
      >
        <h1 className="text-black dark:text-white text-[3rem] tracking-widest">Hi, I am Anish.</h1>
        <ul className="flex flex-wrap items-center">
          <li className="text-gray-500 text-[1.2rem]">Developer</li>
          <li className="rounded-[50%] w-[0.33rem] h-[0.33rem] bg-gray-400 dark:bg-slate-600 mx-2" />
          <li className="text-gray-500 text-[1.2rem]">Tech Enthusiast</li>
          <li className="rounded-[50%] w-[0.33rem] h-[0.33rem] bg-gray-400 dark:bg-slate-600 mx-2" />
          <li className="text-gray-500 text-[1.2rem]">Blogger</li>
        </ul>
        <div className="max-w-[35rem] mt-2 text-[1.1rem]">
          <p className="text-black dark:text-white">
            I love building software and exploring new technologies. Some of my favorite domains are
            fullstack web development, blockchain development and fitbit watchface development.
            Occasionally, I will share my knowledge through my blog.
          </p>
          <h2 className="text-black dark:text-white text-[1.6rem] mt-24">Contact Me</h2>
          <p className="text-black dark:text-white text-[1.1rem]">
            Send me an email at{" "}
            <a href="mailto:anishpandit0703@gmail.com" className="text-link">
              anishpandit0703@gmail.com
            </a>
          </p>
        </div>
      </motion.div>
    </>
  )
}

export default Home
