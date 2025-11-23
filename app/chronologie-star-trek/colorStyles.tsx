type ColorKey = "blue" | "purple" | "yellow" | "green" | "red";

type ColorStyle = {
    pillActive: string;
    iconBg: string;
    iconText: string;
    lineBg: string;
    yearCircleBg: string;
    yearCircleBorder: string;
    yearText: string;
};

export const COLOR_STYLES: Record<ColorKey, ColorStyle> = {
    blue: {
        pillActive: "bg-blue-600 text-white",
        iconBg: "bg-blue-500/20",
        iconText: "text-blue-400",
        lineBg: "from-blue-500",
        yearCircleBg: "bg-blue-500/20",
        yearCircleBorder: "border-blue-500",
        yearText: "text-blue-400",
    },
    purple: {
        pillActive: "bg-purple-600 text-white",
        iconBg: "bg-purple-500/20",
        iconText: "text-purple-400",
        lineBg: "from-purple-500",
        yearCircleBg: "bg-purple-500/20",
        yearCircleBorder: "border-purple-500",
        yearText: "text-purple-400",
    },
    yellow: {
        pillActive: "bg-yellow-500 text-gray-900",
        iconBg: "bg-yellow-400/20",
        iconText: "text-yellow-300",
        lineBg: "from-yellow-400",
        yearCircleBg: "bg-yellow-400/20",
        yearCircleBorder: "border-yellow-400",
        yearText: "text-yellow-300",
    },
    green: {
        pillActive: "bg-green-600 text-white",
        iconBg: "bg-green-500/20",
        iconText: "text-green-400",
        lineBg: "from-green-500",
        yearCircleBg: "bg-green-500/20",
        yearCircleBorder: "border-green-500",
        yearText: "text-green-400",
    },
    red: {
        pillActive: "bg-red-600 text-white",
        iconBg: "bg-red-500/20",
        iconText: "text-red-400",
        lineBg: "from-red-500",
        yearCircleBg: "bg-red-500/20",
        yearCircleBorder: "border-red-500",
        yearText: "text-red-400",
    },
};

export function getColorStyle(color: string): ColorStyle {
    if (color in COLOR_STYLES) {
        return COLOR_STYLES[color as ColorKey];
    }
    return COLOR_STYLES.blue;
}
