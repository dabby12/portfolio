"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa";
import { Shadows_Into_Light, Caveat, Potta_One } from "next/font/google";

import getMonth from "@/utils/getMonth";
import Switch from "@/app/components/Switch";
import Sidebar from "./components/Sidebar";
import Project from "./projects/Project";
import AboutMe from "./AboutMe/AboutMe";

import { ReactLenis, useLenis } from "lenis/react";

import useScrollSnap from "react-use-scroll-snap";


const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
});
const caveat = Caveat({ subsets: ["latin"], weight: "400" });
const pottaOne = Potta_One({ subsets: ["latin"], weight: "400" });

const seasonalColors = {
  Spring: {
    primary: "#2F2F2F", // dark ink
    secondary: "#FADADD", // vibrant cherry blossom pink
    accent: "#FF6F91", // bold floral highlight
  },
  Summer: {
    primary: "#1B1B1B", // bold dark text
    secondary: "#FFD93D", // vibrant yellow
    accent: "#00B4D8", // fresh ocean blue
  },
  Autumn: {
    primary: "#2F2F2F", // rich ink
    secondary: "#FF8C42", // pumpkin orange
    accent: "#D7263D", // deep red (maple leaf vibe)
  },
  Winter: {
    primary: "#EDEDED", // snow white text
    secondary: "#003049", // deep cold navy
    accent: "#D62828", // cranberry red
  },
};

const seasonalGradients = {
  Spring: "linear-gradient(to bottom, #FFF1F3, #C8E7D8)",
  Summer: "linear-gradient(to bottom, #FFFDE7, #A2D2FF)",
  Autumn: "linear-gradient(to bottom, #FFF5E6, #FFD7B5)",
  Winter: "linear-gradient(to bottom, #F0F8FF, #E0F7FA)",
};

const monotoneColors = {
  primary: "#000000",
  secondary: "#888888",
  accent: "#FFFFFF",
};

const monotoneBackground = "#F5F5F5";

type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export default function Home() {
  const [season, setSeason] = useState<Season>("Spring");
  const [isOn, setIsOn] = useState(false);
  const [colors, setColors] = useState(seasonalColors["Spring"]);
  const [bgGradient, setBgGradient] = useState(seasonalGradients["Spring"]);

  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollSnap({
    ref: scrollRef as React.RefObject<HTMLDivElement>,
    duration: 50,
  });

  useEffect(() => {
    const month = getMonth(); // 1–12

    if (month === 2 || month === 3 || month === 4) {
      setSeason("Spring");
    } else if (month == 5 || month == 6 || month == 7) {
      setSeason("Summer");
    } else if (month == 8 || month == 9 || month == 10) {
      setSeason("Autumn");
    } else {
      setSeason("Winter");
    }
  }, []);

  useEffect(() => {
    if (isOn) {
      setColors(seasonalColors[season]);
      setBgGradient(seasonalGradients[season]);
    } else {
      setColors(monotoneColors);
      setBgGradient(monotoneBackground);
    }
    localStorage.setItem("season_theme", String(isOn));
  }, [season, isOn]);

  const toggleColors = () => setIsOn((prev) => !prev);
  console.log(`Current season: ${season}`);

  // lenis

  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });
  console.log("lenis", lenis);
  return (
    <div className="w-full " ref={scrollRef}>
      <ReactLenis root />
      <main
        className="w-full flex flex-col items-center"
        style={{
          background: bgGradient.startsWith("linear")
            ? bgGradient
            : `linear-gradient(${bgGradient}, ${bgGradient})`,
          color: colors.primary,
          transition: "background 0.6s ease, color 0.6s ease",
        }}
      >
        {/* Sidebar */}
        <Sidebar colors={colors} isOn={isOn} />

        {/* Hero Section */}

        <section className="w-full flex flex-col items-center justify-center px-6 py-8 text-center relative h-screen">
          {/* Toggle Switch */}
          <div className="absolute top-4 right-4 group z-20">
            <div className="shadow-lg rounded">
              <Switch isOn={isOn} handleToggleAction={toggleColors} />
            </div>
            <div className="absolute top-full mt-2 right-0 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              {isOn ? "Seasonal Colours" : "Monotone Colours"}
            </div>
          </div>

          {/* Seasonal Badge */}
          {isOn && (
            <motion.div
              className="absolute top-6 left-20 px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-semibold z-30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: colors.primary }}
            >
              {season} Mode
            </motion.div>
          )}

          {/* Floating Background Shape */}
          <motion.div
            className="absolute w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: -100 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />

          {/* Heading */}
          <motion.h1
            className={`${shadowsIntoLight.className} text-5xl font-extrabold mb-4 z-10`}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: colors.primary }}
          >
            Chris Liu
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className={`${caveat.className} text-2xl font-semibold mb-6 z-10 max-w-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ color: colors.secondary }}
          >
            Creative developer & designer bringing ideas to life with code and
            motion.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className={`${pottaOne.className} px-8 py-3 rounded-full text-lg font-bold shadow-lg z-10`}
            style={{
              backgroundColor: colors.secondary,
              color: colors.primary,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="#projects">View My Work</Link>
          </motion.button>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 mt-10 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a
              href="https://github.com/dabby12"
              target="_blank"
              rel="noopener noreferrer "
            >
              <FaGithub className="text-2xl hover:scale-110 transition-transform hover:text-lunote-default-core-kin_gold" />
            </a>
            <span className="flex items-center gap-2 hover:scale-110 transition-transform select-text">
              <FaDiscord className="text-2xl hover:text-blue-300" />
              <a
                className="text-lg"
                href="https://discord.com/users/903807873296003102"
              >
                make_aguess#0993
              </a>
            </span>
            <a href="mailto:makeaguess427@gmail.com">
              <FaEnvelope className="text-2xl hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-10 text-sm opacity-60 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            ↓ Scroll down
          </motion.div>

          {/* Footer */}
          <footer className="absolute bottom-4 text-xs opacity-50 z-10 ">
            &copy; {new Date().getFullYear()} Chris Liu · Built with Next.js +
            Framer Motion
          </footer>
        </section>
        <a id="projects" className="w-full">
          <Project />
        </a>
      </main>
      <AboutMe />
    </div>
  );
}
