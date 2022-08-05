import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import styles from "app/core/styles/Navbar.module.scss"
import { ThemeContext } from "app/core/components/theme/ThemeContext"
import NavItem from "./navitem"
import { toggleTheme } from "app/utils/navutils"
import LinkInterface from "app/types/link"
import { Routes } from "blitz"
import { motion } from "framer-motion"

const Navbar: React.FunctionComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const handleClick = () => {
    toggleTheme(theme, setTheme)
  }
  const links: LinkInterface[] = [
    {
      text: "Blog",
      imageURL: "/blog.png",
      href: Routes.PostsPage(),
    },
    {
      text: "Tech Stack",
      imageURL: "/tech_stack.png",
      href: Routes.TechnologiesPage(),
    },
  ]
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.02 }}
      className={`${styles.container} flex justify-between items-center flex-col z-10 fixed transition-all duration-200 text-gray-500 h-screen w-12 bg-[#0d121b] hover:w-64 sm:static sm:w-full sm:h-12 sm:flex-row`}
    >
      <div className="w-full sm:flex sm:items-center sm:h-full sm:w-fit">
        <Link href="/">
          <a
            className={`${styles.top} group flex justify-end items-center pr-[11px] bg-[#010117] w-full h-12 cursor-pointer group-nav-hover:px-[0.7rem] sm:bg-transparent sm:justify-center sm:h-full sm:p-0 sm:mx-2`}
            id="home"
          >
            <>
              <h1
                id={styles.logo}
                className="absolute left-3 top-[11px] transition-all duration-200 whitespace-nowrap
                -translate-x-[400%] group-nav-hover:-translate-x-0 sm:relative sm:top-1 sm:translate-x-0 sm:mr-3"
              >
                <Image
                  src="/favicon.ico"
                  alt="Logo"
                  width={25}
                  height={25}
                  draggable={false}
                  priority
                />
              </h1>
              <h1
                id={styles.heading}
                className="absolute left-11 tracking-wider transition-all duration-200 whitespace-nowrap -translate-x-[160%] group-hover:text-white text-[1.3rem] sm:hidden"
              >
                CodeWithAnish
              </h1>
              <div className="flex items-center justify-center h-full sm:hidden">
                <Image
                  id={styles.rightArrow}
                  className="relative top-2 duration-[600ms] group-hover:invert"
                  src="/right.png"
                  alt="Right Arrow"
                  width={25}
                  height={25}
                  draggable={false}
                  priority
                />
              </div>
            </>
          </a>
        </Link>
        <ul className={`${styles.middle} mt-6 w-full sm:flex sm:items-center sm:m-0 sm:w-fit`}>
          {links.map((link, key) => {
            return <NavItem link={link} key={key} />
          })}
        </ul>
      </div>
      <div className="flex items-center justify-start w-full h-12 p-2 mb-2 group sm:w-fit sm:m-0">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className={styles.toggle}
          checked={theme === "light"}
          onChange={handleClick}
        />
        <div
          className={`${styles.textContainer} absolute -translate-x-[400%] transition-all duration-200 w-full flex justify-center items-center sm:hidden`}
        >
          <label
            htmlFor="toggle"
            className="transition-all duration-200 text-base mr-[0.4rem] group-hover:text-white"
          >
            {theme.charAt(0).toUpperCase() + theme.substring(1).toLowerCase()} Theme
          </label>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
