import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"

import "app/core/styles/index.scss"
import { useEffect, useState } from "react"
import Theme from "app/types/theme"
import {
  getThemeFromLocalStorage,
  setInitialTheme,
  setThemeInLocalStorage,
} from "app/utils/themeutils"
import { ThemeContext } from "app/core/components/theme/ThemeContext"
import Footer from "app/core/components/footer"
import Navbar from "app/core/components/navbar"
import LoadingBar from "react-top-loading-bar"
import { ProgressContext } from "app/core/components/progress/ProgressContext"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const [theme, setTheme] = useState<Theme>("dark")
  const [progress, setProgressFunc] = useState(0)
  const [loading, setLoading] = useState(false)
  const setProgress = (p: number) => {
    setProgressFunc(p)
    if (p > 0) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (window.localStorage.getItem("theme")) {
      setTheme(getThemeFromLocalStorage(theme))
    } else {
      setInitialTheme(setTheme)
      setThemeInLocalStorage(theme, setTheme)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(
        <>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <ProgressContext.Provider value={{ progress, setProgress }}>
              <Head>
                <title>Bigfoot</title>
                <link
                  href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
                  rel="stylesheet"
                />
              </Head>
              {loading && (
                <LoadingBar
                  color="#007bff"
                  progress={progress}
                  onLoaderFinished={() => setProgress(0)}
                />
              )}
              <Navbar />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />
            </ProgressContext.Provider>
          </ThemeContext.Provider>
        </>
      )}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
