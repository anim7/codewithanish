import { Project } from "@prisma/client"
import { Link, Routes } from "blitz"
import React from "react"

interface Props {
  project: Project
}

const ProjectLink: React.FunctionComponent<Props> = ({ project }) => {
  return (
    <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
      <a></a>
    </Link>
  )
}

export default ProjectLink
