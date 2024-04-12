'use client'

import { useState } from 'react';

function CollapsibleSection() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    { title: "Warm-Up", content: "Description and video of warm-up exercises." },
    { title: "Main Workout", content: "Description and video of main workout exercises." },
    { title: "Cool Down", content: "Description and video of cool down exercises." }
  ];

  return (
    <div className="flex flex-col w-full">
      {sections.map((section, index) => (
        <div key={index}>
          <button
            onClick={() => toggleSection(index)}
            className="py-2 px-4 w-full text-left bg-blue-500 text-white"
          >
            {section.title}
          </button>
          {openSection === index && (
            <div className="p-4 bg-gray-100">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollapsibleSection;
