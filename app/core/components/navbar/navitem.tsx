import Image from "next/image"
import Link from "next/link"
import React from "react"
import LinkInterface from "app/types/link"
import { Routes } from "blitz"

interface Props {
  link: LinkInterface
}

const NavItem: React.FunctionComponent<Props> = ({ link }) => {
  return (
    <Link href={link.href}>
      <a>
        <li className="group list-none w-full flex items-center cursor-pointer py-[0.7rem] transition-all duration-200 pl-[0.7rem] hover:bg-[#00005c81] sm:h-full sm:w-12 sm:m-[0.4rem]">
          <Image
            className="transition-all duration-200 z-[2] group-hover:invert"
            src={link.imageURL}
            alt={link.text}
            width={25}
            height={25}
            draggable={false}
          />
          <div className="absolute w-full flex justify-center items-center -translate-x-[400%] transition-all duration-200 sm:hidden">
            <p className="transition-all text-[1.4rem] mr-4 group-hover:text-white">{link.text}</p>
          </div>
        </li>
      </a>
    </Link>
  )
}

export default NavItem
