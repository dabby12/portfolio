"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Shadows_Into_Light, Caveat, Potta_One } from "next/font/google";
import { FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import getMonth from "@/utils/getMonth";
import Switch from "@/app/components/Switch";
import Sidebar from "./components/Sidebar";

const Globe = dynamic(() => import("@/app/components/Globe"), { ssr: false });

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
});
const caveat = Caveat({ subsets: ["latin"], weight: "400" });
const pottaOne = Potta_One({ subsets: ["latin"], weight: "400" });

const seasonalColors = {
  Spring: { primary: "#FFB7C5", secondary: "#C8E7D8", accent: "#A2D2FF" },
  Summer: { primary: "#00B4D8", secondary: "#FF6B6B", accent: "#FFE66D" },
  Autumn: { primary: "#D2691E", secondary: "#FF924C", accent: "#8F9779" },
  Winter: { primary: "#2E8B57", secondary: "#E0F7FA", accent: "#FFFFFF" },
};

const seasonalGradients = {
  Spring: "linear-gradient(to bottom, #FFB7C5, #C8E7D8)",
  Summer: "linear-gradient(to bottom, #00B4D8, #FFE66D)",
  Autumn: "linear-gradient(to bottom, #D2691E, #8F9779)",
  Winter: "linear-gradient(to bottom, #E0F7FA, #FFFFFF)",
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
    if ([12, 1, 2].includes(month)) setSeason("Winter");
    else if ([3, 4, 5].includes(month)) setSeason("Spring");
    else if ([6, 7, 8].includes(month)) setSeason("Summer");
    else setSeason("Autumn");
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("season_theme");
    setIsOn(stored === "true");
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

  return (
    <main
      className="relative flex flex-col md:flex-row h-screen overflow-hidden"
      style={{
        background: bgGradient.startsWith("linear")
          ? bgGradient
          : `linear-gradient(${bgGradient}, ${bgGradient})`,
        color: colors.primary,
        transition: "background 0.6s ease, color 0.6s ease",
      }}
    >
      {/* Sidebar */}
      {/* Sidebar */}
      <Sidebar colors={colors} isOn={isOn} />

      {/* Main content */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center overflow-auto relative">
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
            className="absolute top-6 left-6 px-3 py-1 bg-white bg-opacity-70 rounded-full text-xs font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: colors.primary }}
          >
            {season} Mode
          </motion.div>
        )}

        {/* Floating background shape */}
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
          <Link href="/projects">View My Work</Link>
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
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl hover:scale-110 transition-transform" />
          </a>
          <span
            className="flex items-center gap-2 hover:scale-110 transition-transform select-text"
            aria-label="Discord username"
          >
            <FaDiscord className="text-2xl" />
            make_aguess#0993
          </span>
          <a href="mailto:makeaguess427@gmail.com" aria-label="Email">
            <FaEnvelope className="text-2xl hover:scale-110 transition-transform" />
          </a>
        </motion.div>

        {/* Footer */}
        <footer className="absolute bottom-4 text-xs opacity-50 z-10">
          &copy; {new Date().getFullYear()} Chris Liu · Built with Next.js +
          Framer Motion
        </footer>

        {/* Projects Grid */}
      </section>
    </main>
  );
}

interface Project {
  name: string;
  readme: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [rowSpans, setRowSpans] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/output.json");
        const data: Project[] = await res.json();
        setProjects(data);
        // Generate fixed random row spans on load for layout variety
        setRowSpans(data.map(() => Math.floor(Math.random() * 4) + 1));
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }
    fetchData();
  }, []);

  function truncate(text: string, max = 200) {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  }

  return (
    <>
      <div
        className="grid gap-4 p-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gridAutoRows: "100px",
        }}
      >
        {projects.map(({ name, readme }, i) => {
          const rowSpan = rowSpans[i] || 1;
          return (
            <div
              key={i}
              onClick={() => setSelectedProject({ name, readme })}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm flex flex-col justify-between cursor-pointer select-none transform transition-transform duration-200 hover:scale-105"
              style={{ gridRowEnd: `span ${rowSpan}` }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedProject({ name, readme });
                }
              }}
              aria-label={`Open project ${name}`}
            >
              <h3 className="mb-2 text-gray-800 font-semibold">{name}</h3>
              <div className="text-gray-600 text-sm overflow-hidden prose max-w-none">
                <ReactMarkdown>{truncate(readme, rowSpan * 150)}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${selectedProject ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={handleOverlayClick}
        aria-hidden={!selectedProject}
        role="dialog"
        aria-modal={!!selectedProject}
      >
        {selectedProject && (
          <div className="relative h-full flex flex-col p-6 overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project panel"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold focus:outline-none"
            >
              &times;
            </button>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {selectedProject.name}
            </h2>
            <div className="prose max-w-none text-gray-700 flex-grow">
              <ReactMarkdown>{selectedProject.readme}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
