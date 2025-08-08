// @ts-expect-error --> i have no idea why but, but, BUT MY TAILWIND CONFIG IS NOT WORKING

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  // Or if using `src` directory:
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ".flowbite-react/class-list.json",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Google Sans", "sans-serif"],
      mono: ["Google Sans Mono", "monospace"],
      shadowsIntoLight: ["Shadows Into Light", "cursive"],
      caveat: ["Caveat", "cursive"],
      pottaOne: ["Potta One", "cursive"],
      googleSansCode: ["Google Sans Code", "monospace"], // Added Google Sans Code
    },
    colors: {
      lunote: {
        default: {
          core: {
            aka_red: "#D70026",
            shiro_white: "#F5F5F5",
            sumi_black: "#2D2D2D",
            ai_indigo: "#0F4C81",
            kin_gold: "#C5A220",
          },
          support: {
            sakura_pink: "#F6C6BD", // fixed from F6C66BD
            matcha_green: "#8C9B6D",
            wakaba_young_leaf: "#C7DC68", // fixed from C7SC68
            uguisu_green: "#6B6F4A",
            shuiro_vermilion: "#954644", // fixed from 95464
          },
          random_colours_i_dont_know_what_to_name: {
            random_colour_1: "#B0E76C", // fixed from BGE76G
          },

          // 🔄 Reusable saved seasonal palette for other uses
          spring: {
            blossom: "#FFB7C5",
            matcha: "#98C9A3",
            sky: "#A3D9FF",
            accent: "#F56565",
            ink: "#2F2F2F",
            washi: "#FDF6F0",
          },
          summer: {
            firework: "#FFD700",
            indigo: "#2E3A59",
            ramune: "#7EC8E3",
            watermelon: "#F65C5C",
            matcha: "#98C9A3",
          },
          autumn: {
            momiji: "#B03A2E",
            persimmon: "#F68B1E",
            brown: "#7A4E2D",
            purple: "#6E5E7B",
            silver: "#D6D6D6",
          },
          winter: {
            snow: "#F9F9F9",
            grey: "#4C4C4C",
            pink: "#F5A9B8",
            black: "#1B1B1B",
            red: "#B02E3A",
          },
        },

        base: {
          moonMist: "#E9EAF0",
          fogGrey: "#B6BBC4",
          sumiInk: "#2F2F2F",
          washiCream: "#FFFDF6",
        },

        seasonal: {
          spring: {
            blossom: "#FFB7C5",
            mint: "#C8E7D8",
            sky: "#A2D2FF",
            petal: "#FDE2E4",
            bud: "#FFE5B4",
          },
          summer: {
            ocean: "#00B4D8",
            sunset: "#FF6B6B",
            sand: "#FFE66D",
            citrus: "#FFB703",
            coral: "#FB6F92",
          },
          autumn: {
            maple: "#D2691E",
            harvest: "#FF924C",
            pumpkin: "#FF6F00",
            moss: "#8F9779",
            ember: "#D1495B",
          },
          winter: {
            frost: "#E0F7FA",
            snow: "#FFFFFF",
            pine: "#2E8B57",
            berry: "#8A1538",
            glacier: "#B5EAEA",
          },
          hanami: "#F9D5E5",
        },

        holiday: {
          halloween: {
            pumpkin: "#FF7518",
            night: "#2B2D42",
            candy: "#FFD700",
            ghost: "#F8F8FF",
            blood: "#8B0000",
          },
          christmas: {
            holly: "#C0392B",
            pine: "#145A32",
            snow: "#ECF0F1",
            gold: "#F4C542",
            mistletoe: "#58B368",
          },
          newyear: {
            firework: "#FFD700",
            champagne: "#F7E7CE",
            midnight: "#1A1A40",
            confetti: "#FF6F91",
            sparkle: "#D9D7F1",
          },
        },

        custom_6b: {
          redish_brown: "#7F3F3F",
          neon: "#FFFF22",
          deep_purple: "#4400AA",
          slighty_off_cyan: "#00F0F0",
          meme_green: "#BADA55",
          magenta_pink: "#D9007E",
          flat_gray: "#888888",
          agreesive_orange: "#FF6E00",
          bright_green: "#00FF00",
          purple_pink: "#CC00CC",
        },
      },
    },
  },
};