import Image from "next/image"
import Link from "next/link"
import React from "react"
import LinkInterface from "app/types/link"

interface Props {
  link: LinkInterface
}

const NavItem: React.FunctionComponent<Props> = ({ link }) => {
  return (
    <li>
      <Link href={link.href}>
        <a
          className="group list-none w-full flex items-center cursor-pointer py-[0.7rem] transition-all duration-200 pl-[0.7rem] hover:bg-[#00005c81] sm:h-full sm:w-12 sm:m-[0.4rem]"
          id={link.text.toLowerCase().replaceAll(" ", "-")}
        >
          <Image
            className="transition-all duration-200 z-[2] group-hover:invert"
            src={link.imageURL}
            alt={link.text}
            width={25}
            height={25}
            draggable={false}
            priority
          />
          <div className="absolute w-full flex justify-center items-center -translate-x-[400%] transition-all duration-200 sm:hidden">
            <p className="transition-all text-[1.4rem] mr-4 group-hover:text-white">{link.text}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default NavItem
