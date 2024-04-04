import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        medium_gray: "#3E3F4E",
        light_gray: "#828FA3",
        cool_gray: "#E4EBFA",
        // primary button
        primary_btn_idle: "#635FC7",
        primary_btn_hover: "#A8A4FF",
      },
    },
  },
  plugins: [daisyui],
};
