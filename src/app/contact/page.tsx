"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaDiscord, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { Shadows_Into_Light, Caveat, Potta_One } from "next/font/google";
import getMonth from "@/utils/getMonth";
import { sendContactEmail } from "@/app/server/EmailSender";
import { toast, ToastContainer } from "react-toastify";
const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
});
const caveat = Caveat({ subsets: ["latin"], weight: "400" });
const pottaOne = Potta_One({ subsets: ["latin"], weight: "400" });

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

export default function ContactPage() {
  const [season, setSeason] = useState<Season>("Spring");
  const [isSeasonal, setIsSeasonal] = useState(true);
  const [colors, setColors] = useState(seasonalColors["Spring"]);
  const [bgGradient, setBgGradient] = useState(seasonalGradients["Spring"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const SuccessToast = () => toast("Message successfully sent!");
  const FailToast = () => toast.error("Failed to send message.");
  // Determine current season based on getMonth()
  useEffect(() => {
    const month = getMonth(); // your custom utility returning 1-12
    if (month === 2 || month === 3 || month === 4) setSeason("Spring");
    else if (month === 5 || month === 6 || month === 7) setSeason("Summer");
    else if (month === 8 || month === 9 || month === 10) setSeason("Autumn");
    else setSeason("Winter");
  }, []);

  // Load user theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("season_theme");
    setIsSeasonal(savedTheme === "true"); // true = seasonal, false = monotone
  }, []);

  // Apply colors and gradients based on season + user preference
  useEffect(() => {
    if (isSeasonal) {
      setColors(seasonalColors[season]);
      setBgGradient(seasonalGradients[season]);
    } else {
      setColors(monotoneColors);
      setBgGradient(monotoneBackground);
    }
  }, [season, isSeasonal]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await sendContactEmail({ name, email, message }); // Pass form data
      setStatus("✅ Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!status) return;
    if (status === "✅ Message sent successfully!") SuccessToast();
    else FailToast();
  }, [status]);

  return (
    <main
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: bgGradient.startsWith("linear")
          ? bgGradient
          : `linear-gradient(${bgGradient}, ${bgGradient})`,
        color: colors.primary,
      }}
    >
      {/* Heading */}
      <motion.h1
        className={`${shadowsIntoLight.className} text-5xl font-extrabold mb-4`}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ color: colors.primary }}
      >
        Contact Me
      </motion.h1>

      <motion.p
        className={`${caveat.className} text-2xl font-semibold mb-10 max-w-xl text-center`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ color: colors.secondary }}
      >
        Have a project in mind, or just want to say hi? Let’s connect!
      </motion.p>

      {/* Contact Form */}
      <motion.form
        className="w-full max-w-lg flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ borderColor: colors.secondary }}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ borderColor: colors.secondary }}
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ borderColor: colors.secondary }}
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className={`${pottaOne.className} px-6 py-3 rounded-full font-bold shadow-lg`}
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary,
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </motion.form>

      {/* Social Links */}
      <motion.div
        className="flex gap-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href="https://github.com/Nycthera"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-2xl hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://discord.com/users/903807873296003102"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord className="text-2xl hover:scale-110 transition-transform" />
        </a>
        <a href="mailto:makeaguess427@gmail.com">
          <FaEnvelope className="text-2xl hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-2xl hover:scale-110 transition-transform" />
        </a>
      </motion.div>

      <footer className="mt-12 text-xs opacity-60">
        &copy; {new Date().getFullYear()} Chris Liu
      </footer>
      <a href="/">
        <button
          className={`px-6 py-2 rounded-full font-semibold shadow-lg transition-transform transform hover:scale-105 fixed bottom-0 right-0 m-4`}
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary,
            border: `2px solid ${colors.accent}`,
          }}
        >
          Back
        </button>
      </a>
      <ToastContainer />
    </main>
  );
}
