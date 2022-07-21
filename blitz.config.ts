import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import withPWA from "next-pwa"

const config: BlitzConfig = withPWA({
  pwa: {
    dest: "public",
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: "bigfoot",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  images: {
    domains: ["github.com", "cdn.worldvectorlogo.com", "avatars.githubusercontent.com"],
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
})
module.exports = config
