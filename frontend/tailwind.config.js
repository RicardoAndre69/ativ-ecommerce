/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#B0B0B0',
          900: '#333333',
        },
        red: {
          DEFAULT: '#FF4C4C',
        },
        yellow: {
          DEFAULT: '#FFEA00',
        },
        green: {
          neon: '#39FF14',
        },
        beige: '#D1B89B',
        brown: {
          DEFAULT: '#4B3D3D',
        },
        navy: '#1A1A2E',
        teal: '#007B7F',
      },
    },
  },
  plugins: [],
};