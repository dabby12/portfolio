// src/components/LogoGrid.jsx
import React from "react";
import Python from "../assets/icons8-python.svg";
import JS from "../assets/icons8-javascript.svg";
import HTML from "../assets/icons8-html.svg";
import ReactCo from '../assets/icons8-react.svg'
import CSS from "../assets/icons8-css.svg";
import TailWind from '../assets/icons8-tailwind-css.svg'
import Vite from '../assets/icons8-vite.svg'
import Cplusplus from '../assets/icons8-c++.svg'
const logos = [
  { id: 1, src: Python, alt: "Python Logo", name: "Python", link: "https://www.python.org" },
  { id: 2, src: JS, alt: "JavaScript Logo", name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { id: 3, src: HTML, alt: "HTML Logo", name: "HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { id: 4, src: CSS, alt: "CSS Logo", name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { id: 5, src: ReactCo, alt: "React Logo", name: "React", link: "https://react.dev/"},
  { id: 6, src: TailWind, alt: "Tailwind CSS", name: "Tailwind CSS", link: "https://tailwindcss.com/docs/installation"},
  { id: 7, src: Vite, alt: "Vite", name: "Vite", link: "https://vite.dev/"},
  { id: 8, src: Cplusplus, alt: "C++", name: "C++", link: "https://learn.microsoft.com/en-us/cpp/?view=msvc-170"}
];


const LogoGrid = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">Technologies I Use</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {logos.map((logo) => (
          <a
            key={logo.id}
            href={logo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-200 transition-all"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-16 object-contain transform group-hover:scale-110 transition-transform"
            />
            <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-500 transition-colors">
              {logo.name}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;
