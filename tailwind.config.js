const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Monument: ["Monument"],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    require('@tailwindcss/typography'),
  ]
}

