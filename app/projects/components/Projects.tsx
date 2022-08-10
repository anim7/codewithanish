import { Project } from "@prisma/client"
import React from "react"
import ProjectLink from "./ProjectLink"

interface Props {
  projects: Project[]
}

const Projects: React.FunctionComponent<Props> = ({ projects }) => {
  return (
    <div className="flex flex-col items-center min-h-screen ml-12 sm:ml-0">
      <h1 className="text-[2rem] text-black dark:text-white mt-2">Projects</h1>
      <div className="flex flex-col items-center">
        {projects.map((project, key) => {
          return <ProjectLink project={project} key={key} />
        })}
      </div>
    </div>
  )
}

export default Projects
