import Position from "app/types/position"
import { Link, Routes, RouteUrlObject } from "blitz"
import React from "react"
import Button from "../button"

interface Props {
  position: Position
  handleDelete: () => void
  editPageHref: string | RouteUrlObject
}

const ContextMenu: React.FunctionComponent<Props> = ({ position, handleDelete, editPageHref }) => {
  return (
    <ul
      className="bg-[#090c12cf] rounded-lg overflow-hidden"
      style={{ top: `${position.y}px`, left: `${position.x}px`, position: "absolute" }}
    >
      <li>
        <Link href={editPageHref}>
          <a className="text-gray-400 hover:text-white flex items-center justify-center p-[0.2rem]">
            Edit
          </a>
        </Link>
      </li>
      <li>
        <Button
          className="rounded-none"
          marginY="0"
          onClick={handleDelete}
          width="10rem"
          bg="#e60000"
          bgHover="red"
          animate={false}
        >
          Delete
        </Button>
      </li>
    </ul>
  )
}

export default ContextMenu
