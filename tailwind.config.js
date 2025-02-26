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
