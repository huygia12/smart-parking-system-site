/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  separator: "_",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          softer: "hsl(var(--primary-softer))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        third: {
          DEFAULT: "hsl(var(--third))",
          foreground: "hsl(var(--third-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        sweep: {
          "0%": {
            transform: "translate(-150%, -150%) rotate(45deg)",
            opacity: "0",
          },
          "50%": { opacity: "1" },
          "100%": {
            transform: "translate(150%, 150%) rotate(45deg)",
            opacity: "0",
          },
        },
        pulseZoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)", opacity: "1" },
          "25%": { transform: "translateX(-10px)", opacity: "0.3" },
          "50%": { transform: "translateX(10px)", opacity: "1" },
          "75%": { transform: "translateX(-10px)", opacity: "0.3" },
        },
        translateAndRotate: {
          "0%": {
            transform: "translateX(0) rotate(90deg)",
          },
          // "50%": {
          //   transform: "translateX(0) rotate(90deg)", // Translate X first
          // },
          "80%": {
            transform: "-translateY(10rem) rotate(0deg)", // Rotate after translation
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        sweep: "sweep 1.5s ease-in-out infinite",
        "sweep-slow": "sweep 2.5s ease-in infinite",
        pulseZoom: "pulseZoom 3s ease-in-out infinite",
        shake: "shake 1s ease-in-out",
        translateAndRotate: "translateAndRotate 2s ease-out forwards",
      },
      max: {
        sm: "50rem",
        md: "56rem",
        lg: "64rem",
        xl: "72rem",
        "2xl": "84rem",
        "3xl": "110rem",
      },
      minWidth: {
        sm: "50rem",
        md: "56rem",
        lg: "64rem",
        xl: "72rem",
        "2xl": "84rem",
        "3xl": "110rem",
      },
      width: {
        sm: "50rem",
        md: "56rem",
        lg: "64rem",
        xl: "72rem",
        "2xl": "84rem",
        "3xl": "98rem",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1452px",
        "3xl": "1622px",
        "4xl": "1800px",
      },
      boxShadow: {
        general:
          "1px 2px 10px 3px rgba(0, 0, 0, 0.3), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
