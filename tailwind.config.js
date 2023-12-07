/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const {nextui} = require("@nextui-org/react");
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const daisyui = require("daisyui");
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'dropdown-img': "url('/src/assets/svgs/curvedLine.svg')"
            }
        },
    },
    plugins: [nextui({
        defaultTheme: "light"
    }), daisyui],

    daisyui: {
        theme: ["none"],
        base: false,
        prefix: "ds-"
    }
}

