const { background } = require('@cloudinary/url-gen/qualifiers/focusOn');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        light:{
          primary:"#0E7C7B",
          secondary:"#56CCF2",
          tertiary:"#FBBC04",
          green:"#1DBF73",
          textBlack:"#404145",
          textGrey:"#787878",
          textRed:"#FF4E4E",
          background:"F5F7F9"
        }
      }
    },
  },
  plugins: [],
}