/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': "#111827",
                'danger': "#7F1D1D",
                'focus': "#111827",
                'disable': "#1118279c",
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
