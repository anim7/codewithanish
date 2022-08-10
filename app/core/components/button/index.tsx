import React from "react"
import { motion } from "framer-motion"

interface Props {
  children?: React.ReactNode
  onClick?: () => void
  bg?: string
  bgHover?: string
  color?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  id?: string
  width?: string
  className?: string
  animate?: boolean
  marginX?: string
  marginY?: string
}

const Button: React.FunctionComponent<Props> = ({
  children,
  onClick,
  bg,
  bgHover,
  color,
  type,
  disabled,
  id,
  width,
  className,
  animate = true,
  marginX = "0",
  marginY = "1rem",
}) => {
  const checkIdExists = (id: string): boolean => {
    const element = document.getElementById(id)
    if (!element) {
      return false
    }
    return true
  }
  return (
    <motion.button
      className={`p-[0.2rem] rounded-[0.5rem] ${className}`}
      whileHover={{
        background: bgHover || "#1c8aff",
        scale: animate ? 1.05 : 1,
      }}
      whileTap={{ scale: animate ? 0.95 : 1 }}
      transition={{ duration: 0.02 }}
      style={{
        background: bg || "#007bff",
        color: color || "white",
        width: width || "100%",
        margin: `${marginY} ${marginX} `,
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      id={id && checkIdExists(id) ? id : undefined}
    >
      {children}
    </motion.button>
  )
}

export default Button
