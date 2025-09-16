"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa";
import { Shadows_Into_Light, Caveat, Potta_One } from "next/font/google";
import ContactPage from "./contact/page";
// animejs
import { animate, createTimeline, stagger, text, Timeline } from "animejs";

import getMonth from "@/utils/getMonth";
import Switch from "@/app/components/Switch";
import Sidebar from "@/app/components/Sidebar";
import Project from "@/app/components/projects/Project";
import AboutMe from "@/app/AboutMe/AboutMe";

import { ReactLenis, useLenis } from "lenis/react";

// Google Fonts
const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
});
const caveat = Caveat({ subsets: ["latin"], weight: "400" });
const pottaOne = Potta_One({ subsets: ["latin"], weight: "400" });
// Color Themes
const seasonalColors = {
  Spring: { primary: "#2F2F2F", secondary: "#FADADD", accent: "#FF6F91" },
  Summer: { primary: "#1B1B1B", secondary: "#FFD93D", accent: "#00B4D8" },
  Autumn: { primary: "#2F2F2F", secondary: "#FF8C42", accent: "#D7263D" },
  Winter: { primary: "#EDEDED", secondary: "#003049", accent: "#D62828" },
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

  useEffect(() => {
    const month = getMonth();
    if (month === 2 || month === 3 || month === 4) setSeason("Spring");
    else if (month === 5 || month === 6 || month === 7) setSeason("Summer");
    else if (month === 8 || month === 9 || month === 10) setSeason("Autumn");
    else setSeason("Winter");
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
  useLenis();
  useEffect(() => {
    const { chars } = text.split("h1", { words: false, chars: true });
    animate(chars, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      opacity: [
        { value: 0, duration: 300, easing: "linear" },
        { value: 1, duration: 1100, easing: "easeInOutQuad" },
      ],
      scale: [
        { value: 0.8, duration: 600, easing: "easeOutExpo" },
        { value: 1, duration: 800, easing: "easeOutBounce", delay: 100 },
      ],
      color: [
        { value: "#FF6F61", duration: 800, easing: "easeInOutSine" },
        {
          value: "#000000",
          duration: 800,
          easing: "easeInOutSine",
          delay: 800,
        },
      ],
      delay: stagger(50),
      ease: "inOutCirc",
      loopDelay: 1000,
      loop: false,
    });
  }, []);

  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: "out(3)", duration: 500 },
    });

    tl.label("start")
      .add(".github", {
        translateY: [
          { value: -30, duration: 400 },
          { value: 0, duration: 400 },
        ],
        rotate: "1turn",
        scale: [
          { value: 1.2, duration: 400 },
          { value: 1, duration: 400 },
        ],
        offset: 500, // offset in ms
      })

      .add(".discord", {
        translateY: [
          { value: -30, duration: 400 },
          { value: 0, duration: 400 },
        ],
        rotate: "-1turn",
        scale: [
          { value: 1.2, duration: 400 },
          { value: 1, duration: 400 },
        ],
        offset: "start", // label reference as offset
      })

      .add(".gmail", {
        translateY: [
          { value: -30, duration: 400 },
          { value: 0, duration: 400 },
        ],
        rotate: "1turn",
        scale: [
          { value: 1.2, duration: 400 },
          { value: 1, duration: 400 },
        ],
        offset: "<-=500", // relative offset
      });
  }, []);

  return (
    <main
      className="w-full min-h-screen flex flex-col items-center"
      style={{
        background: bgGradient.startsWith("linear")
          ? bgGradient
          : `linear-gradient(${bgGradient}, ${bgGradient})`,
        color: colors.primary,
      }}
    >
      <ReactLenis root />
      <Sidebar colors={colors} isOn={isOn} />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Toggle Switch */}
        <div className="absolute top-4 right-4 group z-20">
          <div className="shadow-lg rounded">
            <Switch isOn={isOn} handleToggleAction={toggleColors} />
          </div>
          <div className="absolute top-full mt-2 right-0 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
            {isOn ? "Seasonal Colours" : "Monotone Colours"}
          </div>
        </div>

        {/* Seasonal Label */}
        {isOn && (
          <motion.div
            className="absolute top-6 left-20 px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-semibold z-30 "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: colors.primary, backgroundColor: colors.secondary }}
          >
            {season} Mode
          </motion.div>
        )}

        {/* Animated Light */}
        <motion.div
          className="absolute w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: -100 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />

        <motion.h1
          className={`${shadowsIntoLight.className} text-5xl font-extrabold mb-4 z-10`}
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
          style={{ color: colors.primary }}
        >
          Chris Liu
        </motion.h1>

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

        <motion.div
          className="flex gap-6 mt-10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="https://github.com/Nycthera"
            target="_blank"
            rel="noopener noreferrer"
            className="github"
          >
            <FaGithub className="text-2xl hover:scale-110 transition-transform hover:text-black" />
          </a>
          <span className="flex items-center gap-2 hover:scale-110 transition-transform select-text">
            <FaDiscord className="text-2xl hover:text-blue-300" />
            <a
              className="text-lg hover:text-blue-300 transition-transform select-text"
              href="https://discord.com/users/903807873296003102"
            >
              make_aguess#0993
            </a>
          </span>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=makeaguess427@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="text-2xl hover:scale-110 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-10 text-sm opacity-60 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          ↓ Scroll down
        </motion.div>

        <footer className="absolute bottom-4 text-xs opacity-50 z-10">
          &copy; {new Date().getFullYear()} Chris Liu · Built with Next.js +
          Framer Motion
        </footer>
      </section>

      {/* Projects */}
      <section id="projects" className="w-full">
        <Project />
      </section>

      {/* About Me */}
      <section className="w-full">
        <AboutMe />
      </section>
    </main>
  );
}
