import { Theme } from "../types/theme"
import { setThemeInLocalStorage } from "./themeutils"

export const toggleTheme = (theme: Theme, setTheme: (theme: Theme) => void) => {
  setThemeInLocalStorage(theme === "light" ? "dark" : "light", setTheme)
}
