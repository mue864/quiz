/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
       './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        OCR: ["OCR", "sans-serif"],
        JoseFin: ["Josefin Sans", "sans-serif"],
        Outfit: ["Outfit", "sans-serif"]
      },
    },
  },
  plugins: [],
}

