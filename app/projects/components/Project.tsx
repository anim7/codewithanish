import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import { Project as ProjectInterface } from "@prisma/client"
import Button from "app/core/components/button"
import React from "react"
import deleteProject from "../mutations/deleteProject"

interface Props {
  project: ProjectInterface
}

const Project: React.FunctionComponent<Props> = ({ project }) => {
  const session = useSession()
  const router = useRouter()
  const [deleteProjectMutation] = useMutation(deleteProject)
  const handleDelete = async () => {
    await deleteProjectMutation({ id: project.id })
    await router.push(Routes.Projects())
  }
  const handleEdit = () => {
    void router.push(Routes.EditProject({ slug: project.slug }))
  }
  return (
    <div className="flex flex-col items-center min-h-screen p-4 px-20 ml-12 sm:px-3 sm:ml-0">
      <h1 className="text-[2rem] font-bold text-black dark:text-white">{project.title}</h1>
      <article className="flex flex-col items-center w-full mt-4">
        <p className="text-[1.2rem] text-black dark:text-gray-400">{project.description}</p>
      </article>
      {session.role === "ADMIN" && (
        <>
          <Button width="10rem" bg="#e60000" bgHover="red" onClick={handleDelete} marginY="0.2rem">
            Delete
          </Button>
          <Button
            width="10rem"
            bg="rgb(0 111 230)"
            bgHover="#007bff"
            onClick={handleEdit}
            marginY="0.2rem"
          >
            Edit
          </Button>
        </>
      )}
    </div>
  )
}

export default Project
