// src/components/Projects.jsx
import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-200 text-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Replace these with your project cards */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Project Title 1</h3>
            <p className="mb-4">A brief description of the project.</p>
            <a href="#" className="text-blue-500 hover:underline">View Project</a>
          </div>
          {/* Add more projects as needed */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
