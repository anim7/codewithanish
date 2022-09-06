import { simpleRolesIsAuthorized } from "@blitzjs/auth"
// import { sessionMiddleware } from "@blitzjs/auth"
import withPWA from "next-pwa"
import { BlitzConfig, setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage } from "@blitzjs/auth"
import db from "db"
import { authConfig } from "./blitz-client"

const config: BlitzConfig = withPWA({
  pwa: {
    dest: "public",
  },
  // middleware: [
  //   sessionMiddleware({
  //     cookiePrefix: "bigfoot",
  //     isAuthorized: simpleRolesIsAuthorized,
  //   }),
  // ],
  images: {
    domains: ["github.com", "cdn.worldvectorlogo.com", "avatars.githubusercontent.com"],
  },
})

export const { gSSP, gSP, api } = setupBlitzServer({
  ...config,
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
})
