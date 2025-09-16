"use client";

import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";
import { Satisfy, Handlee } from "next/font/google";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-satisfy",
  display: "swap",
});

const handlee = Handlee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-handlee",
  display: "swap",
});

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  font: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "Home", icon: <FaHome />, href: "/", font: "var(--font-satisfy)" },
  { label: "Projects", icon: <FaProjectDiagram />, href: "/projects", font: "" },
  { label: "About Me", icon: <FaUser />, href: "/about", font: "" },
  { label: "Contact", icon: <FaEnvelope />, href: "/contact", font: "" },
  { label: "Education", icon: <FaGraduationCap />, href: "/education", font: "" },
];

interface SidebarProps {
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  isOn?: boolean;
}

export default function Sidebar({ colors: initialColors }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [themeColors, setThemeColors] = useState(initialColors || {
    primary: "#000000",
    secondary: "#888888",
    accent: "#FFFFFF",
  });

  const seasonalColors = {
    Spring: { primary: "#2F2F2F", secondary: "#FADADD", accent: "#FF6F91" },
    Summer: { primary: "#1B1B1B", secondary: "#FFD93D", accent: "#00B4D8" },
    Autumn: { primary: "#2F2F2F", secondary: "#FF8C42", accent: "#D7263D" },
    Winter: { primary: "#EDEDED", secondary: "#003049", accent: "#D62828" },
  };

  // Detect and apply seasonal theme
  useEffect(() => {
    const useSeasonal = localStorage.getItem("seasonal_theme") === "true";
    if (useSeasonal) {
      const season = localStorage.getItem("season") || "Spring"; // fallback
      setThemeColors(seasonalColors[season as keyof typeof seasonalColors]);
    }
  }, []);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-3 rounded-full shadow-lg"
        style={{ backgroundColor: themeColors.primary, color: themeColors.accent }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Bottom Drawer */}
      <aside
        className={`fixed bottom-0 left-0 w-full max-h-[60vh] bg-white bg-opacity-90 backdrop-blur-md shadow-xl 
    rounded-t-xl p-6 transform transition-transform duration-300 ease-in-out md:hidden z-40
    ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col space-y-6">
          {sidebarItems.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              className={`${handlee.className} flex items-center gap-4 text-lg font-semibold text-gray-900`}
              style={{ color: themeColors.primary }}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`${satisfy.variable} ${handlee.variable} hidden md:flex fixed top-0 left-0 h-full w-16 
    bg-white bg-opacity-30 backdrop-blur-md border-r border-gray-300 shadow-md
    flex-col items-center justify-start py-8 transition-[width] duration-300 ease-in-out z-40
    hover:w-48 rounded-r-2xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        style={{ color: themeColors.primary }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col gap-10 w-full">
          <div
            className="flex items-center justify-center mb-8 px-2 cursor-default select-none"
            style={{ color: themeColors.primary }}
          >
            <span
              className="text-2xl font-bold whitespace-nowrap transition-transform duration-300"
              style={{
                transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                transformOrigin: "left center",
                fontFamily: "var(--font-satisfy)",
              }}
            >
              My Portfolio
            </span>
          </div>

          <nav className="flex flex-col gap-6 w-full">
            {sidebarItems.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-colors duration-300
                  ${isExpanded ? "justify-start" : "justify-center"} cursor-pointer select-none`}
                style={{ color: themeColors.primary }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = themeColors.accent;
                  target.style.color = themeColors.secondary;
                  target.querySelector("svg")?.classList.add("animate-bounce");
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = "transparent";
                  target.style.color = themeColors.primary;
                  target.querySelector("svg")?.classList.remove("animate-bounce");
                }}
              >
                <span className="text-2xl">{icon}</span>
                {isExpanded && (
                  <span className={`${handlee.className} font-medium whitespace-nowrap`}>
                    {label}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
