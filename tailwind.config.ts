import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // 🔵 Intro STFC
    "text-xl",
    "text-gray-300",
    "font-medium",
    "leading-relaxed",
    "mb-8",
    "border-l-4",
    "border-blue-500",
    "pl-6",
    "bg-blue-500/5",
    "py-4",
    "rounded-r-lg",

    // 🟣 Quote STFC
    "border-purple-500",
    "bg-purple-500/5",
    "my-8",
    "italic",

    // 🟠 Info-bulle STFC
    "bg-gradient-to-r",
    "from-blue-500/10",
    "to-purple-500/10",
    "border",
    "border-blue-500/30",
    "rounded-xl",
    "p-6",
    "text-lg",
    "font-semibold",
    "text-blue-300",
    "mb-3",
    "flex",
    "items-center",
  ],
  plugins: [],
};

export default config;
