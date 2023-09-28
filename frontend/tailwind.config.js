/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            "colors": {
                "coffeeGreen": {
                    1: "#77DD77",
                    2: "#4ED34E",
                    3: "#2FBC2F"
                },
                "coffeeYellow": {
                    1: "#FFFAA0",
                    2: "#FFF87D",
                    3: "#FFF64C"
                },
                "coffeeRed": {
                    1: "#FF5757",
                    2: "#FF3A3A",
                    3: "#FB0000"
                }
            },
            "screens": {
                "sm": "450px",
                "md": "850px"
            },
        },
    },
    plugins: [],
}

