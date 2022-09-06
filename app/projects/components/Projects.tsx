import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useSession } from "@blitzjs/auth"
import { Project } from "@prisma/client"
import React, { useEffect, useState } from "react"
import ProjectLink from "./ProjectLink"
import { motion } from "framer-motion"
import Position from "app/types/position"
import deleteProject from "../mutations/deleteProject"
import ContextMenu from "app/core/components/menu"

interface Props {
  projects: Project[]
}

const Projects: React.FunctionComponent<Props> = ({ projects }) => {
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
  const [p, setP] = useState<Project[]>(projects)
  const [deleteProjectMutation] = useMutation(deleteProject)

  const handleDelete = async () => {
    await deleteProjectMutation({ id: clickedId })
    setVisible(false)
    setP(p.filter((project) => project.id !== clickedId))
  }

  const handleClickOutside = () => {
    setVisible(false)
  }

  return (
    <>
      <motion.main
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center min-h-screen ml-12 sm:ml-0"
      >
        <h1 className="text-[2rem] font-bold text-black dark:text-white mt-2">Projects</h1>
        <div className="flex flex-col items-center max-w-[50rem]">
          {projects.map((project, key) => {
            return (
              <ProjectLink
                project={project}
                key={key}
                onContextMenu={(event) => {
                  event.preventDefault()
                  if (session.role === "ADMIN") {
                    setPosition({ x: event.pageX, y: event.pageY })
                    setClickedId(project.id)
                    setVisible(true)
                  }
                }}
              />
            )
          })}
        </div>
      </motion.main>
      {visible && (
        <ContextMenu
          position={position}
          editPageHref={Routes.EditProjectPage({
            slug: p.filter((project) => project.id === clickedId)[0]!.slug,
          })}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default Projects
