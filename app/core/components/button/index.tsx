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
      whileHover={{ background: bgHover || "#1c8aff", scale: 1.05 }}
      className={`p-[0.2rem] my-4 rounded-[0.5rem] ${className}`}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.02 }}
      style={{ background: bg || "#007bff", color: color || "white", width: width || "100%" }}
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
