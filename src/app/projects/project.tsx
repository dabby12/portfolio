// app/projects/Project.tsx
"use client";

import React from "react";
import styled from "styled-components";

export default function Project() {
  return (
    <ProjectWrapper>
      <ProjectSection id="projects" style={{ background: "#FFADAD" }}>
        <h1>Project 1</h1>
        <p>Some description here.</p>
      </ProjectSection>
      <ProjectSection style={{ background: "#FFD6A5" }}>
        <h1>Project 2</h1>
        <p>More info here.</p>
      </ProjectSection>
      <ProjectSection style={{ background: "#CAFFBF" }}>
        <h1>Project 3</h1>
        <p>Final section content.</p>
      </ProjectSection>
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
`;
