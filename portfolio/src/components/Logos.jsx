// Not working.

import React, { useState, useEffect } from 'react';
import ReactLogo from '../assets/icons8-react.svg'
import TailWindLogo from '../assets/icons8-tailwind-css.svg'
import JavaScriptLogo from '../assets/icons8-javascript.svg'
import HTMLLogo from '../assets/icons8-html.svg'
import CSSLogo from '../assets/icons8-css.svg'
import PythonLogo from '../assets/icons8-python.svg'
// Array of logos with names
const logos = [
  { src: ReactLogo, name: 'React' },
  { src: TailWindLogo, name: 'Tailwind CSS' },
  { src: JavaScriptLogo, name: 'JavaScript' },
  { src: HTMLLogo, name: 'HTML' },
  { src: CSSLogo, name: 'CSS' },
  { src: ViteLogo, name: 'Vite' },
  { src: PythonLogo, name: 'Python' },
];

const Specialise = () => {
  const [visibleLogos, setVisibleLogos] = useState(logos);

  // Fade-in and fade-out effect every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change visible logos to create a transition effect
      const shuffledLogos = logos.sort(() => Math.random() - 0.5).slice(0, 4);
      setVisibleLogos(shuffledLogos);
    }, 3000); // Change logos every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <section className="bg-gray-100 py-10 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Technologies I Specialise In</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {visibleLogos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center opacity-0 transition-opacity duration-1000 ease-in-out opacity-100"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
              <span className="mt-2 text-sm md:text-base">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialise;
