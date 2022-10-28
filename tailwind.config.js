/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#FF0000',
                'button': "#FD5555", 
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
            }, 
            boxShadow: {
                'button': "0px 0px 8px rgba(255, 0, 0, 0.25)"
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        }
    },
    plugins: [
        // require("flowbite/plugin"),
        // require('tailwind-scrollbar')({ nocompatible: true })
    ]
}
