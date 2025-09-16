"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

type Repo = {
  name: string;
  url: string;
  private: boolean;
  description: string | null;
};

export default function Project() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("/server/api/getRepo"); // calls your API route
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  console.log("Repos:", repos);

  if (loading) return <p>Loading projects...</p>;

  return (
    <ProjectWrapper>
      {repos.map((repo, index) => (
        <ProjectSection
          key={repo.name}
          style={{ background: index % 2 === 0 ? "#FFADAD" : "#FFD6A5" }}
        >
          <h1>{repo.name}</h1>
          <p>{repo.description ?? "No description provided."}</p>
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            View Repo
          </a>
        </ProjectSection>
      ))}
    </ProjectWrapper>
  );
}

// Styled Components
const ProjectWrapper = styled.div`
  width: 100%;
`;

const ProjectSection = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  padding: 2rem;
  box-sizing: border-box;

  a {
    margin-top: 1rem;
    color: blue;
    text-decoration: underline;
    font-size: 1.2rem;
  }
`;
