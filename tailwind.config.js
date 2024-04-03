import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        medium_gray: "#3E3F4E",
        cool_gray: "#E4EBFA",
      },
    },
  },
  plugins: [daisyui],
};
