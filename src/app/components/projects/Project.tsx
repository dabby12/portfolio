"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

type Repo = {
  name: string;
  url: string;
  private: boolean;
  description: string | null;
};


export default function Project() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/server/api/getRepo");
        
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Expected JSON, got: ${text.slice(0, 100)}...`);
        }

        const data = await res.json();
        setRepos(data); // adjust if your API returns { repos: [...] }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch repos");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!repos.length) return <p>No projects found.</p>;

  return (
  <div className="p-6 space-y-6">

    {/* Terminal Section */}
    <div className="rounded-lg overflow-hidden shadow-lg">
    </div>
  </div>
);

}
