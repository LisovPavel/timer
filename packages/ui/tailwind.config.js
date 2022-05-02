const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: colors.orange,
    },
    animation: {
      tick: "pulse 1s linear infinite",
    },
  },
  plugins: [],
};
