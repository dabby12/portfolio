// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hello, I'm Your Name</h1>
        <p className="text-xl md:text-2xl mb-8">A passionate developer and problem solver.</p>
        <a href="#projects" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          View My Work
        </a>
      </div>
    </section>
  );
};

export default Hero;
