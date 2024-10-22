/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#dafe02', // Add custom yellow color
      },
    },
  },
  plugins: [],
};
