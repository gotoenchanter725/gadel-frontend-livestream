/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'input-border': '#A8A6A6', 
            },

            fontFamily: {
                inter: ['"Inter"']
            }, 

            backgroundImage: {
                'auth-header-background': "url('assets/images/auth-background.png')", 
                'user-background': "url('assets/images/user-background.png')", 
            }, 
            backgroundSize: {
                '100%': "100% 100%"
            }
        },
    },
    plugins: [
        // require("flowbite/plugin"),
        // require('tailwind-scrollbar')({ nocompatible: true })
    ]
}
