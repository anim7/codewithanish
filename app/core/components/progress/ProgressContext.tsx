import { createContext } from "react"

export const ProgressContext = createContext<{
  progress: number
  setProgress: (progress: number) => void
}>({
  progress: 0,
  setProgress: (progress: number) => {
    return
  },
})
