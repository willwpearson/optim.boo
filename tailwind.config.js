const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Barlow', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                '2xs': '0.5rem'
            },
            colors: {
                
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
