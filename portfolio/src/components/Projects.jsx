import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-200 text-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Replace these with your project cards */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">
              Designing an app with basic introductions about textile waste
            </h3>
            <p className="mb-4">Used Vite, React and Tailwind CSS</p>
            
            
            <a
              href="https://textile-waste.vercel.app/" // Replace this with the actual project link
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Ensures security when opening external links
              className="text-blue-500 hover:underline"
            >
              View Project
            </a>
          </div>
          {/* Add more projects as needed */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">
              Project Imajer
            </h3>
            <p className="mb-4">Used Next.js and Tailwind CSS</p>
          
            <a
              href="https://imager-orcin.vercel.app//" // Replace this with another project link
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
