// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-r from-purple-500 to-pink-500
 text-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <p className="max-w-2xl mx-auto font-bold hover:text-gray-700">
          I am a dedicated developer with a passion for building web applications.
          I enjoy learning new technologies and creating projects that solve problems.
        </p>
      </div>
    </section>
  );
};

export default About;
