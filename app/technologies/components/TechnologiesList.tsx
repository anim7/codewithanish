import { Technology } from "@prisma/client"
import { Image } from "blitz"
import React from "react"
import { motion } from "framer-motion"

interface Props {
  techs: Technology[]
}

const TechnologiesList: React.FunctionComponent<Props> = ({ techs }) => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 ml-12 sm:ml-0">
      <h1 className="text-black dark:text-white text-[2rem] font-bold">My Tech Stack</h1>
      <div className="grid items-center justify-center w-full gap-4 p-4 pl-12 grid-cols-posts">
        {techs.map((tech, key) => {
          return (
            <motion.a
              href={tech.link}
              key={key}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.02 }}
            >
              <div className="flex items-center w-16 h-16">
                <Image
                  className={`${tech.invertInDarkMode && "dark:invert"}`}
                  src={tech.logo}
                  alt={tech.name}
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <h2 className="text-black dark:text-white text-[1.3rem] font-semibold">
                  {tech.name}
                </h2>
                <p className="text-black dark:text-white">{tech.desc}</p>
              </div>
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}

export default TechnologiesList
