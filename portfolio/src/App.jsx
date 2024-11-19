import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
// import Logos from './components/Logos' -> not working 

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Projects />

    </div>
  );
}

export default App;

