/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#FF0000', 
                'secondary': '#EBE5E5', 
                'secondary-font': '#767373', 
                'input-border': '#A8A6A6', 
                'shadow': '#ff000040'
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
