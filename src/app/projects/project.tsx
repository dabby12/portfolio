"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
// @ts-ignore
import createScrollSnap from "scroll-snap";

export default function Project() {
  useEffect(() => {
    const element = document.getElementById("snap-container");
    if (!element) return;

    const { bind, unbind } = createScrollSnap(element, {
      snapDestinationY: "100%",
      timeout: 100,
      duration: 300,
      threshold: 0.1,
    });

    bind();

    return () => unbind();
  }, []);

  return (
    <Container id="snap-container">
      <Section style={{ background: "#FFADAD" }}>
        <h1>Project 1</h1>
        <p>Some description here.</p>
      </Section>
      <Section style={{ background: "#FFD6A5" }}>
        <h1>Project 2</h1>
        <p>More info here.</p>
      </Section>
      <Section style={{ background: "#CAFFBF" }}>
        <h1>Project 3</h1>
        <p>Final section content.</p>
      </Section>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
