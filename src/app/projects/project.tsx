"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Project {
  name: string;
  readme: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  // Store row spans here for each project index
  const [rowSpans, setRowSpans] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/output.json");
        const data: Project[] = await res.json();
        setProjects(data);

        // Generate fixed random spans for each project once
        const spans = data.map(() => Math.floor(Math.random() * 4) + 1);
        setRowSpans(spans);
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
      {/* Grid of projects */}
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
            >
              <h3 className="mb-2 text-gray-800 font-semibold">{name}</h3>
              <div className="text-gray-600 text-sm overflow-hidden prose max-w-none">
                <ReactMarkdown>{truncate(readme, rowSpan * 150)}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side panel drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${selectedProject ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={handleOverlayClick}
        aria-hidden={!selectedProject}
      >
        {selectedProject && (
          <div className="relative h-full flex flex-col p-6 overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close panel"
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
