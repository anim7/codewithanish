// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    screens: {
      sm: { max: "600px" },
    },
    extend: {
      gridTemplateColumns: {
        posts: "repeat(auto-fill, 19rem)",
      },
    },
  },
  plugins: [],
}
