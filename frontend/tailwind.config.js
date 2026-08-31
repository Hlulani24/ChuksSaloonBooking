/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#1B1620",       // deep plum-black base
        surface: "#241E29",    // card / raised surface on dark
        cream: "#F6F0EC",      // primary light text / light backgrounds
        mauve: "#A8586B",      // primary brand accent (dusty rose, not generic pink)
        mauveDark: "#823E4D",
        champagne: "#C9A66B",  // specials / highlight accent
        sage: "#748C69",       // fresh / success accent
        line: "#332B39",       // hairline borders on dark
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "10px",
      },
    },
  },
  plugins: [],
};
