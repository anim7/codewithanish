// tailwind.config.js
module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  purge: ["./app/**/*.{js,ts,jsx,tsx}"],
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
