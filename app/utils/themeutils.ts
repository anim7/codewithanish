import { Theme } from "../types/theme"

export const setInitialTheme = (setTheme: (theme: Theme) => void) => {
  if (!localStorage.getItem("theme")) {
    const hours = new Date().getHours()
    if (hours > 7 && hours < 20) {
      setTheme("light")
      changeClassList("light")
    } else {
      setTheme("dark")
      changeClassList("dark")
    }
  }
}

export const getThemeFromLocalStorage = (initial: Theme): Theme => {
  try {
    const theme = window.localStorage.getItem("theme") as Theme
    changeClassList(theme ? theme : initial)
    return theme ? theme : initial
  } catch (_) {
    return initial
  }
}

export const setThemeInLocalStorage = (theme: Theme, setTheme: (theme: Theme) => void) => {
  setTheme(theme)
  changeClassList(theme)
  try {
    window.localStorage.setItem("theme", theme)
  } catch (_) {}
}

const changeClassList = (theme: Theme) => {
  if (theme === "light") {
    document.documentElement.classList.remove("dark")
    document.body.style.backgroundColor = "white"
    // document.body.style.backgroundImage = "none";
  } else {
    document.documentElement.classList.add("dark")
    document.body.style.backgroundColor = "rgb(1 1 1/1)"
    // document.body.style.backgroundImage = 'url("background.png")';
  }
}
