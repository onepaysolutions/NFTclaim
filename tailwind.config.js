/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./pages/**/*.{ts,tsx,jsx,js,css}",
    "./components/**/*.{ts,tsx,jsx,js,css}",
    "./app/**/*.{ts,tsx,jsx,js,css}",
    "./src/**/*.{ts,tsx,jsx,js,css}", ],
  theme: {
    extend: {
      colors: {
        "c-white-text": "#f5f5f5",
        "c-violet": "#5d445f",
        "c-violet-2": "#866E88",
        "c-violet-button": "#86308A4D",
        "c-yellow": "#E2AA4C",
        "c-black": "#070606",
      }
    },
  },
  plugins: [],
};
