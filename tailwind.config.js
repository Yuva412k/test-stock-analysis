module.exports = {
    content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "apple-400": "var(--apple-400)",
          "bermuda-gray950": "var(--bermuda-gray950)",
          "dove-gray100": "var(--dove-gray100)",
          "dove-gray200": "var(--dove-gray200)",
          "dove-gray300": "var(--dove-gray300)",
          "dove-gray50": "var(--dove-gray50)",
          "dove-gray800": "var(--dove-gray800)",
          "dove-gray900": "var(--dove-gray900)",
          "mariner-800": "var(--mariner-800)",
          "pizazz-200": "var(--pizazz-200)",
          "state-colorserror": "var(--state-colorserror)",
          "valencia-300": "var(--valencia-300)",
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
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
        fontFamily: {
          "body-regular": "var(--body-regular-font-family)",
          "body-semibold": "var(--body-semibold-font-family)",
          "headings-h5-semibold": "var(--headings-h5-semibold-font-family)",
          "headings-h6-semibold": "var(--headings-h6-semibold-font-family)",
          "paragraph-regular": "var(--paragraph-regular-font-family)",
          "paragraph-semibold": "var(--paragraph-semibold-font-family)",
          "span-tags-regular": "var(--span-tags-regular-font-family)",
          "title-1-regular": "var(--title-1-regular-font-family)",
          "title-1-semibold": "var(--title-1-semibold-font-family)",
          "title-semibold": "var(--title-semibold-font-family)",
          sans: [
            "ui-sans-serif",
            "system-ui",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
          ],
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
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
      container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    },
    plugins: [],
    darkMode: ["class"],
  };
  