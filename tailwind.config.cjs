/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*primary*/
        'bright-blue': 'hsl(220, 98%, 61%)',
        /*Check Background*/
        'from': 'hsl(192, 100%, 67%)',
        'to': 'hsl(280, 87%, 65%)',
        /*light theme*/
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'light-grayish-blue': 'hsl(233, 11%, 84%)',
        'dark-grayish-blue': 'hsl(236, 9%, 61%)',
        'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',
        /*dark theme*/
        'very-dark-blue': 'hsl(235, 21%, 11%)',
        'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
        'light-grayish-blue': 'hsl(234, 39 %, 85 %)',
        'light-grayish-blue(hover)': 'hsl(236, 33%, 92%)',
        'dark-grayish-blue': 'hsl(234, 11%, 52%)',
        'very-dark-grayish-blue': ' hsl(233, 14%, 35%)',
        'very-dark-grayish-blue': 'hsl(237, 14%, 26%)',
      },
      backgroundImage: {
        'mobile-light-mode': "url('./images/bg-mobile-light.jpg')",
        'mobile-dark-mode': "url('./images/bg-mobile-dark.jpg')",
        'desktop-light-mode': "url('./images/bg-desktop-light.jpg')",
        'desktop-dark-mode': "url('./images/bg-desktop-dark.jpg')",
      },
      fontFamily: {
        josefinSans: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}