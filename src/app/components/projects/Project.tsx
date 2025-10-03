"use client";

import React, { useEffect, useState } from "react";
import { createTimeline } from "animejs";
import { Space_Mono } from "next/font/google";

type Repo = {
  name: string;
  url: string;
  private: boolean;
  description: string | null;
};

// Import Space Mono
const spaceMonoFont = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export default function Project() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Repos
  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/server/api/getRepo");
        const contentType = res.headers.get("content-type");

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Expected JSON, got: ${text.slice(0, 100)}...`);
        }

        const data = await res.json();
        setRepos(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch repos");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  // Animate project cards (Anime.js v4)
  useEffect(() => {
    if (!repos.length) return;

    const tl = createTimeline({ defaults: { duration: 600 } });

    tl.label("start")
      .add(
        ".project-card",
        {
          opacity: [0, 1],
          translateY: [30, 0],
        delay: (el, i) => i * 120,
      easing: "easeOutQuad",
    });
  }, [repos]);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading projects...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!repos.length) return <p className="text-center mt-10 text-gray-400">No projects found.</p>;

  return (
    <div className={`${spaceMonoFont.className} py-12 px-4 max-w-6xl mx-auto`}>
      <h2 className="text-4xl font-bold text-center mb-12 text-green-400 relative inline-block">
        Projects
        <span className="absolute left-0 bottom-0 w-full h-1 bg-green-500 rounded-full" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo, idx) => (
          <a
            key={idx}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card bg-gray-900/70 backdrop-blur-md text-gray-100 p-6 rounded-xl shadow-xl border border-gray-700 hover:shadow-green-400/50 hover:scale-105 transform transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-green-300 flex items-center justify-between mb-2">
              {repo.name} {repo.private && <span className="text-red-400 text-sm ml-2">Private</span>}
            </h3>
            {repo.description && (
              <p className="text-gray-400 text-sm mb-4">{repo.description}</p>
            )}
            <p className="text-green-400 text-xs text-right font-semibold">
              ↗ View Repository
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
