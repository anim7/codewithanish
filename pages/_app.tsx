import { withBlitz } from "app/blitz-client"
import Head from "next/head"
import { useQueryErrorResetBoundary } from "@blitzjs/rpc"

import { AppProps, ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"

import LoginForm from "app/auth/components/LoginForm"

import "app/core/styles/index.scss"
import { Suspense, useEffect, useState } from "react"
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
import LogInOut from "app/auth/components/LogInOutButton"
import { AuthenticationError, AuthorizationError } from "blitz"
import Background from "app/core/components/background"
import { useRouter } from "next/router"

export default withBlitz(function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
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

  router.events?.on("routeChangeStart", () => setProgress(60))
  router.events?.on("routeChangeComplete", () => setProgress(100))
  router.events?.on("routeChangeError", () => setProgress(0))

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
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="192x192"
                  href="/android-icon-192x192.png"
                />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#0D121B" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <link href="/manifest.json" rel="manifest" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                  name="viewport"
                  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes"
                />
                <meta
                  name="description"
                  content="CodeWithAnish is my personal website, where I write posts about software development"
                />
                <meta
                  name="keywords"
                  content="coding codewithanish web development programming fitbit blockchain"
                />
                <meta name="theme-color" content="#0D121B" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="CodeWithAnish" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="msapplication-navbutton-color" content="#0D121B" />
                <meta name="msapplication-TileColor" content="#0D121B" />
                <meta name="msapplication-TileImage" content="icon-144x144.png" />
                <meta name="msapplication-config" content="browserconfig.xml" />
                <meta name="application-name" content="CodeWithAnish" />
                <meta name="msapplication-tooltip" content="" />
                <meta name="msapplication-starturl" content="/" />
                <meta name="og:title" content="CodeWithAnish" />
                <meta
                  name="og:description"
                  content="CodeWithAnish is my personal website, where I write posts about software development"
                />
                <meta name="og:image" content="/favicon.ico" />
                <meta name="twitter:title" content="CodeWithAnish" />
                <meta
                  name="twitter:description"
                  content="CodeWithAnish is my personal website, where I write posts about software development"
                />
                <meta name="twitter:image" content="favicon.ico" />
                <meta name="twitter:card" content="summary_large_image" />
              </Head>
              <Background />
              {loading && (
                <LoadingBar
                  color="#007bff"
                  progress={progress}
                  onLoaderFinished={() => setProgress(0)}
                />
              )}
              <Navbar />
              <Suspense>
                <LogInOut />
              </Suspense>
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
})

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
