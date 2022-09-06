// const { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/auth")
const withPWA = require("next-pwa")
const { withBlitz } = require("@blitzjs/next")

const config = withBlitz(
  withPWA({
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
    eslint: {
      ignoreDuringBuilds: true,
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
)
module.exports = config
