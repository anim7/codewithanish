if (!self.define) {
  let e,
    c = {}
  const n = (n, s) => (
    (n = new URL(n + ".js", s).href),
    c[n] ||
      new Promise((c) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;(e.src = n), (e.onload = c), document.head.appendChild(e)
        } else (e = n), importScripts(n), c()
      }).then(() => {
        let e = c[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (s, a) => {
    const i = e || ("document" in self ? document.currentScript.src : "") || location.href
    if (c[i]) return
    let r = {}
    const t = (e) => n(e, i),
      o = { module: { uri: i }, exports: r, require: t }
    c[i] = Promise.all(s.map((e) => o[e] || t(e))).then((e) => (a(...e), r))
  }
}
define(["./workbox-6a1bf588"], function (e) {
  "use strict"
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/TN9fL6uvzngSaiSw2KyG6/_buildManifest.js",
          revision: "ba54e8c9e7f409404df90a1a60c5631e",
        },
        {
          url: "/_next/static/TN9fL6uvzngSaiSw2KyG6/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/150-7f476789238574369b35.js",
          revision: "7f476789238574369b35",
        },
        {
          url: "/_next/static/chunks/85.110b34373be4cc343b1e.js",
          revision: "110b34373be4cc343b1e",
        },
        {
          url: "/_next/static/chunks/eabe11fc.a074d6c9d59e160ccde4.js",
          revision: "a074d6c9d59e160ccde4",
        },
        {
          url: "/_next/static/chunks/fb7d5399-136df9514c1404acf572.js",
          revision: "136df9514c1404acf572",
        },
        {
          url: "/_next/static/chunks/framework-72d60332aa365e9ded4e.js",
          revision: "72d60332aa365e9ded4e",
        },
        {
          url: "/_next/static/chunks/main-40d6278cd7b9398b7396.js",
          revision: "40d6278cd7b9398b7396",
        },
        {
          url: "/_next/static/chunks/pages/404-f605dce6cca31f520b14.js",
          revision: "f605dce6cca31f520b14",
        },
        {
          url: "/_next/static/chunks/pages/_app-c4472bbec4afeedcc2be.js",
          revision: "c4472bbec4afeedcc2be",
        },
        {
          url: "/_next/static/chunks/pages/_error-ea939aab753d9e9db3bd.js",
          revision: "ea939aab753d9e9db3bd",
        },
        {
          url: "/_next/static/chunks/pages/blog-1d63e6836a203f6b81a8.js",
          revision: "1d63e6836a203f6b81a8",
        },
        {
          url: "/_next/static/chunks/pages/blog/%5Bslug%5D-d351786b0e9fe05cfcf1.js",
          revision: "d351786b0e9fe05cfcf1",
        },
        {
          url: "/_next/static/chunks/pages/blog/%5Bslug%5D/edit-d61331c04019a3a0ac09.js",
          revision: "d61331c04019a3a0ac09",
        },
        {
          url: "/_next/static/chunks/pages/blog/new-ce7965245c08a698962b.js",
          revision: "ce7965245c08a698962b",
        },
        {
          url: "/_next/static/chunks/pages/index-d6692ed53775cc495a64.js",
          revision: "d6692ed53775cc495a64",
        },
        {
          url: "/_next/static/chunks/pages/login-8a97f36756b461871341.js",
          revision: "8a97f36756b461871341",
        },
        {
          url: "/_next/static/chunks/pages/projects-92f4654685732e6634de.js",
          revision: "92f4654685732e6634de",
        },
        {
          url: "/_next/static/chunks/pages/projects/%5Bslug%5D-ddc62cfd3eea1020de8c.js",
          revision: "ddc62cfd3eea1020de8c",
        },
        {
          url: "/_next/static/chunks/pages/projects/%5Bslug%5D/edit-54e0720972a20ecf9b8f.js",
          revision: "54e0720972a20ecf9b8f",
        },
        {
          url: "/_next/static/chunks/pages/projects/new-cce62c55270b2ac35634.js",
          revision: "cce62c55270b2ac35634",
        },
        {
          url: "/_next/static/chunks/pages/tech_stack-34ad62a9fa2e03799c9c.js",
          revision: "34ad62a9fa2e03799c9c",
        },
        {
          url: "/_next/static/chunks/pages/tech_stack/%5BtechnologyId%5D/edit-3836fe25659359ac9498.js",
          revision: "3836fe25659359ac9498",
        },
        {
          url: "/_next/static/chunks/pages/tech_stack/new-d2d20cbaf7676f37ccfa.js",
          revision: "d2d20cbaf7676f37ccfa",
        },
        {
          url: "/_next/static/chunks/polyfills-e7a279300235e161e32a.js",
          revision: "e7a279300235e161e32a",
        },
        {
          url: "/_next/static/chunks/webpack-9ee8f72932d6234794e2.js",
          revision: "9ee8f72932d6234794e2",
        },
        { url: "/_next/static/css/3633e19d8105faaa2737.css", revision: "3633e19d8105faaa2737" },
        { url: "/_next/static/css/a13002c9dbfd9a6a8913.css", revision: "a13002c9dbfd9a6a8913" },
        { url: "/_next/static/css/fdcc1e5b8895007d2b71.css", revision: "fdcc1e5b8895007d2b71" },
        { url: "/android-icon-144x144.png", revision: "c33f03fef94c7226137eda3f46b07506" },
        { url: "/android-icon-192x192.png", revision: "01f5049475836e9645046671a3b730c2" },
        { url: "/android-icon-36x36.png", revision: "d39de53304e7842f6be3d2d6128e93f5" },
        { url: "/android-icon-48x48.png", revision: "8d655f0bb519ef6cfb9b2929d462863d" },
        { url: "/android-icon-72x72.png", revision: "cf56f0c36c45c815e72028fabe4f3c9a" },
        { url: "/android-icon-96x96.png", revision: "0dc43f99924eee1890ed187c5f2b79ac" },
        { url: "/apple-icon-114x114.png", revision: "34a9ff292973ef55ebc680082e361ed3" },
        { url: "/apple-icon-120x120.png", revision: "67282f43fd2907aa9f7c3a322797b056" },
        { url: "/apple-icon-144x144.png", revision: "c33f03fef94c7226137eda3f46b07506" },
        { url: "/apple-icon-152x152.png", revision: "6ac34b986ad4427715a9f624c8188e24" },
        { url: "/apple-icon-180x180.png", revision: "e61b88b4e0139197d2f4ed1f655711a4" },
        { url: "/apple-icon-57x57.png", revision: "23a44f3b895a246317f7206dfaebde60" },
        { url: "/apple-icon-60x60.png", revision: "1bdd8a8cbde95410b5e8f74589b69eb8" },
        { url: "/apple-icon-72x72.png", revision: "cf56f0c36c45c815e72028fabe4f3c9a" },
        { url: "/apple-icon-76x76.png", revision: "bb47103c181540540b731ce4f9cc34c8" },
        { url: "/apple-icon-precomposed.png", revision: "824065abd954bfe740833321e6735b28" },
        { url: "/apple-icon.png", revision: "824065abd954bfe740833321e6735b28" },
        { url: "/background.png", revision: "a3e50d59f35d6ac4d49910407fd1ae84" },
        { url: "/blog.png", revision: "ee459b6e78121a37b31b355dc93eb17c" },
        { url: "/browserconfig.xml", revision: "653d077300a12f09a69caeea7a8947f8" },
        { url: "/dev.png", revision: "7eda497742c0b37e6fba6f07d247a05d" },
        { url: "/favicon-16x16.png", revision: "b01295ff4fc543d5a3d73492d743674e" },
        { url: "/favicon-32x32.png", revision: "bb51e016b253bf0673266473681d1f80" },
        { url: "/favicon-96x96.png", revision: "e920cefcc5dd0e152dcd02be43f69ad8" },
        { url: "/favicon.ico", revision: "5ac3191f2da024ad9d8ebee4040793a5" },
        { url: "/github.png", revision: "ec3a60c8c6539a07eb70b52f6737ea6e" },
        { url: "/icons/icon-128x128.png", revision: "d7aca72626880f31233d41dfba1ec6a8" },
        { url: "/icons/icon-144x144.png", revision: "020db20f4b73aaa789e3829d71526dbe" },
        { url: "/icons/icon-152x152.png", revision: "95e51fac129dcb4ea41f17aa3973c26e" },
        { url: "/icons/icon-192x192.png", revision: "0ba0e92266be9c5d8563f46d967e094f" },
        { url: "/icons/icon-384x384.png", revision: "819dbcf40e7cfcd7025fcf53ff319bd9" },
        { url: "/icons/icon-512x512.png", revision: "4f7c887575d9b3e4c3422ada922e9b9e" },
        { url: "/icons/icon-72x72.png", revision: "e1222f97dfea7d56eaee6c06ad8a7199" },
        { url: "/icons/icon-96x96.png", revision: "c9945bedcc28e7fa7bf45f27e69e239b" },
        { url: "/linkedin.png", revision: "2467ee53337aab4c20524fef2bfa3f10" },
        { url: "/login.png", revision: "232b3d487fc38ae30be91ff006ab5f9d" },
        { url: "/logout.png", revision: "420a311d262a0432627a0af8aca642cc" },
        { url: "/manifest.json", revision: "1a753d4e6af7061c3957e2bac73b089e" },
        { url: "/ms-icon-144x144.png", revision: "c33f03fef94c7226137eda3f46b07506" },
        { url: "/ms-icon-150x150.png", revision: "b4c901f0e0f700eb475edc8680d4242a" },
        { url: "/ms-icon-310x310.png", revision: "ef8d2e41a9b51851218cc81fa54f13e8" },
        { url: "/ms-icon-70x70.png", revision: "a365d32163eb173eb946b0eb4d933901" },
        { url: "/project.png", revision: "caac43489e306196450518bc8736472b" },
        { url: "/right.png", revision: "e73b7c24616264318160034b57d82414" },
        { url: "/tech_stack.png", revision: "ef4e72dfdf54eae954c4b7115d52e6e2" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: c, event: n, state: s }) =>
              c && "opaqueredirect" === c.type
                ? new Response(c.body, { status: 200, statusText: "OK", headers: c.headers })
                : c,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const c = e.pathname
        return !c.startsWith("/api/auth/") && !!c.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith("/api/")
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      "GET"
    )
})
