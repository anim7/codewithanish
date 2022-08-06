import { Technology } from "@prisma/client"
import { Image, Link, Routes, useMutation, useSession } from "blitz"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Position from "app/types/position"
import Button from "app/core/components/button"
import deleteTechnology from "../mutations/deleteTechnology"

interface Props {
  techs: Technology[]
}

const TechnologiesList: React.FunctionComponent<Props> = ({ techs }) => {
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
  const [technologies, setTechnologies] = useState<Technology[]>(techs)
  const [deleteTechnologyMutation] = useMutation(deleteTechnology)
  const handleDelete = async () => {
    await deleteTechnologyMutation({ id: clickedId })
    setVisible(false)
    setTechnologies(technologies.filter((tech) => tech.id !== clickedId))
  }
  const handleClickOutside = () => {
    setVisible(false)
  }
  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-6 ml-12 sm:ml-0">
        <h1 className="text-black dark:text-white text-[2rem] font-bold">My Tech Stack</h1>
        <div className="grid items-center justify-center w-full gap-4 p-4 pl-12 grid-cols-posts">
          {technologies.map((tech, key) => {
            return (
              <motion.a
                href={tech.link}
                key={key}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.02 }}
                onContextMenu={(e) => {
                  if (session.role === "ADMIN") {
                    e.preventDefault()
                    setPosition({ x: e.pageX, y: e.pageY })
                    setClickedId(tech.id)
                    setVisible(true)
                  }
                }}
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
          <Link href={Routes.NewTechnologyPage()}>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.02 }}
              className="flex items-center justify-center text-gray-300 bg-white rounded shadow-xl cursor-pointer h-52 dark:bg-slate-900 dark:shadow-sm dark:shadow-slate-800 dark:border-slate-800 dark:border dark:text-slate-700 font-extralight text-[6rem]"
            >
              +
            </motion.a>
          </Link>
        </div>
      </div>
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

export default TechnologiesList
