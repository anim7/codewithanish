import Link from "next/link"
import Image from "next/image"
import { Routes } from "@blitzjs/next"
import { Project } from "@prisma/client"
import React from "react"
import { motion } from "framer-motion"

interface Props {
  project: Project
  onContextMenu?: React.MouseEventHandler<HTMLElement>
}

const Icon: React.FunctionComponent<{ link: string }> = ({ link }) => {
  return (
    <>
      {link.includes("github.com") ? (
        <svg
          aria-hidden="true"
          data-prefix="fab"
          data-icon="github"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          className="w-6 h-6 dark:invert-0 invert"
          aria-label="GitHub"
          color="#fff"
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          ></path>
        </svg>
      ) : (
        <div className="flex items-center justify-center w-6 h-6">
          <Image className="dark:invert" src="/link.png" alt="link" width={20} height={20} />
        </div>
      )}
    </>
  )
}

const ProjectLink: React.FunctionComponent<Props> = ({ project, onContextMenu }) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{
        default: {
          duration: 0.02,
          ease: [0, 0.71, 0.2, 1.01],
        },
        scale: {
          type: "spring",
          damping: 4,
          stiffness: 100,
          restDelta: 0.5,
        },
      }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-[12rem] flex w-full dark:border-[1.5px] rounded-2xl p-2 dark:border-slate-800 shadow-xl dark:shadow-sm dark:shadow-slate-800 my-2 sm:flex-col sm:h-fit"
      onContextMenu={onContextMenu}
    >
      <div className="h-full w-[18rem] relative dark:bg-[#04031b] overflow-hidden sm:w-full sm:h-[10rem]">
        {project.image && project.image.length > 0 && (
          <Image src={project.image} alt={project.title} layout="fill" objectFit="contain" />
        )}
      </div>
      <div className="flex flex-col mt-3 ml-4">
        <Link href={Routes.Project({ slug: project.slug })}>
          <a className="w-fit">
            <h2 className="text-black dark:text-white text-[1.5rem] font-bolder hover:text-gray-500 inline-block dark:hover:text-gray-400">
              {project.title}
            </h2>
          </a>
        </Link>
        <p className="text-black dark:text-white">{project.summary}</p>
        <div className="flex flex-wrap mt-4">
          <div className="flex items-center mb-1">
            <Icon link={project.link1} />
            <a
              href={project.link1}
              className="relative flex items-center ml-1 mr-2 text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{project.link1.split("://")[1]}</p>
            </a>
          </div>
          <div className="flex items-center mr-2">
            <Icon link={project.link2} />
            <a
              href={project.link2}
              className="relative flex ml-1 text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{project.link2.split("://")[1]}</p>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectLink
