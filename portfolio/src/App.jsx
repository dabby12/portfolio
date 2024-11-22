import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import LogoGrid from './components/LogoGrid';
import Education from './components/Education'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Projects />
      <LogoGrid />
      <Education />
    </div>
  );
}

export default App;

