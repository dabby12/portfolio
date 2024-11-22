// src/components/Education.jsx
import React from 'react';

// Sample data structure for education items
const educationData = [
  {
    school: 'National University of Singapore',
    degree: 'Bachelor of Science in Computer Science',
    field: 'Computer Science ',
    startDate: '2020',
    endDate: '2024',
    // description: 'Brief description about your coursework or achievements.'
  },
  {
    school: 'Another School',
    degree: 'Another Degree',
    field: 'Another Field of Study',
    startDate: 'Start Date',
    endDate: 'End Date',
    description: 'Details about projects or key achievements during this period.'
  }
  // Add more items as needed
];

const Education = () => {
  return (
    <div className="education-section bg-gradient-to-t from-soft-orange via-orange-500 to-peach">
      <h2 className="text-2xl font-bold mb-4 text-center ">Education</h2>
      {educationData.map((item, index) => (
        <div key={index} className="education-item mb-6 text-center">
          <h3 className="text-xl font-semibold text-center">{item.degree}</h3>
          <p className="text-black text-center font-bold ">{item.school} - {item.field}</p>
          <p className="text-black text-center font-bold">{item.startDate} - {item.endDate}</p>
          <p className="mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;
