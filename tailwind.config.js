/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(270deg, #e5814a, #f1d286)",
      },
      colors: {
        primaryBg: "#141414",
        inputBg: "#222222",
        balanceText: "#6C757D",
        notConnectedText: "#969696",
        notConnectedBg: "#1A1A1A",
      },
      screens: {
        sm: "450px",
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
      fontStretch: {
        expanded: "expanded",
        condensed: "condensed",
        normal: "normal",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".font-expanded": {
          "font-stretch": "expanded",
        },
        ".font-condensed": {
          "font-stretch": "condensed",
        },
        ".font-normal": {
          "font-stretch": "normal",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

