"use client";

import React, { useState } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";
import { Satisfy, Handlee} from "next/font/google";

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

/* const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-montserrat-alternates",
  display: "swap",
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nothing-you-could-do",
  display: "swap",
});

const grandstander = Grandstander({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-grandstander",
  display: "swap",
}); */

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  font: string
};

// custom fonnts not used yet, but can be added later
// const customFonts = [montserratAlternates, nothingYouCouldDo, grandstander];
const sidebarItems: SidebarItem[] = [
  { label: "Home", icon: <FaHome />, href: "/", font: "var(--font-satisfy)" },
  { label: "Projects", icon: <FaProjectDiagram />, href: "/projects", font: "" },
  { label: "About Me", icon: <FaUser />, href: "/about", font: "" },
  {  label: "Contact", icon: <FaEnvelope />, href: "/contact", font: "" },
  { label: "Education", icon: <FaGraduationCap />, href: "/education", font: "" },
];

interface SidebarProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  isOn: boolean;
}

export default function Sidebar({ colors }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-4 right-4 z-50 md:hidden p-3 rounded-full shadow-lg"
        style={{ backgroundColor: colors.primary, color: colors.accent }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Bottom Drawer */}
      <aside
        className={`fixed bottom-0 left-0 w-full max-h-[60vh] bg-white bg-opacity-90 backdrop-blur-md shadow-xl 
    rounded-t-xl p-6  /* <-- added rounded top corners */
    transform transition-transform duration-300 ease-in-out md:hidden z-40
    ${isOpen ? "translate-y-0" : "translate-y-full"}
  `}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col space-y-6">
          {sidebarItems.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              className={`${handlee.className} flex items-center gap-4 text-lg font-semibold text-gray-900 hover:text-${colors.accent}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Desktop Sidebar - vertical rotated bar */}
      <aside
        className={`${satisfy.variable} ${handlee.variable} hidden md:flex fixed top-0 left-0 h-full w-16 
    bg-white bg-opacity-30 backdrop-blur-md border-r border-gray-300 shadow-md
    flex-col items-center justify-start py-8 transition-[width] duration-300 ease-in-out z-40
    hover:w-48 rounded-r-2xl  /* <-- added rounded right corners */
  `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        style={{ color: colors.primary }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="flex flex-col gap-10 w-full"
          style={{ color: colors.primary }}
        >
          {/* Logo / Title */}
          <div
            className="flex items-center justify-center mb-8 px-2 cursor-default select-none"
            style={{ color: colors.primary }}
          >
            {/* Rotate text to normal when expanded */}
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
                  ${isExpanded ? "justify-start" : "justify-center"}
                  hover:bg-[${colors.accent}] hover:text-[${colors.secondary}]
                  cursor-pointer select-none
                `}
                style={{
                  color: colors.primary,
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = colors.accent;
                  target.style.color = colors.secondary;
                  target.querySelector("svg")?.classList.add("animate-bounce");
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = "transparent";
                  target.style.color = colors.primary;
                  target
                    .querySelector("svg")
                    ?.classList.remove("animate-bounce");
                }}
              >
                <span className="text-2xl">{icon}</span>
                {isExpanded && (
                  <span
                    className={`${handlee.className} font-medium whitespace-nowrap`}
                  >
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
