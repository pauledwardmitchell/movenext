'use client'

import { useState } from 'react';

function WorkoutSections() {
  const sections = [
    { name: 'Warm-Up', videos: ['warmup1.mp4', 'warmup2.mp4'] },
    { name: 'Core Strength', videos: ['core1.mp4', 'core2.mp4'] },
    { name: 'Cool Down', videos: ['cooldown1.mp4', 'cooldown2.mp4'] }
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 p-4">
        {sections.map((section, index) => (
          <button
            key={section.name}
            className={`py-2 px-4 rounded-lg ${index === selectedTab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab(index)}
          >
            {section.name}
          </button>
        ))}
      </div>
      <div className="w-full">
        {sections[selectedTab].videos.map((video, index) => (
          <div key={index} className="p-4">
            <video className="w-full max-w-sm mx-auto" controls>
              <source src={`/path/to/videos/${video}`} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutSections;
