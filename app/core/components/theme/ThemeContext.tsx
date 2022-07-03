import Theme from "app/types/theme"
import { createContext } from "react"

export const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: "light",
  setTheme: (theme: Theme) => {
    return
  },
})
