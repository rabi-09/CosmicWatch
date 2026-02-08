/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    black: "#0B0B15",
                    void: "#050508",
                    dark: "#1A1625",
                    accent: "#00F0FF", // Cyan
                    highlight: "#D1D5DB", // Light Grey
                    warning: "#FFBF00", // Amber
                    danger: "#FF003C", // Red
                    success: "#00FF9D", // Green
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Rajdhani', 'sans-serif'],
            },
            backgroundImage: {
                'starfield': "url('/assets/starfield.png')", // Placeholder
                'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
