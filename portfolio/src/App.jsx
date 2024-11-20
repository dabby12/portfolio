import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import LogoGrid from './components/LogoGrid';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Projects />
      <LogoGrid />
    </div>
  );
}

export default App;

