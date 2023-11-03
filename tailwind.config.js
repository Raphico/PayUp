/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        pending: "hsl(var(--pending))",
        paid: "hsl(var(--paid))",
        draft: "hsl(var(--draft))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        edit: {
          DEFAULT: "hsl(var(--edit))",
          foreground: "hsl(var(--edit-foreground))",
        },
        delete: {
          DEFAULT: "hsl(var(--delete))",
          foreground: "hsl(var(--delete-foreground))",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) -2px)",
      },
    },
  },
  plugins: [],
}
