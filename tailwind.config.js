/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            screens: {
                xs: "29.6875rem",
            },
            container: {
                center: true,
                padding: "1rem",
                screens: {
                    xs: "29.6875rem",
                    sm: "40rem",
                    md: "48rem",
                    lg: "64rem",
                    xl: "80rem",
                    xxl: "96rem",
                    xxxl: "120rem",
                },
            },
            width: {
                "90p": "90%",
            },
        },
    },
    plugins: [],
};
