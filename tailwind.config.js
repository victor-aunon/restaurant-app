/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(255, 255, 255, 0.4)",
        card: "rgba(255, 255, 255, 0.8)",
        lightTextGray: "#9ca0ab",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
