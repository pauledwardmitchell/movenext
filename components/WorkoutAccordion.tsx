"use client"

import { useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import ExerciseCard from "@/components/ExerciseCard";
import { CldVideoPlayer, getCldVideoUrl } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css';

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const WorkoutAccordion = ({ sections }) => {
  const [openSection, setOpenSection] = useState(null);
  const [openExercise, setOpenExercise] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
    setOpenExercise(null);  // Reset exercise accordion when changing sections
  };

  const toggleExercise = (exerciseId) => {
    setOpenExercise(openExercise === exerciseId ? null : exerciseId);
  };

  return (
    <div>
      {sections.map((section) => (
        <Accordion key={section.id} open={openSection === section.id}>
          <AccordionHeader onClick={() => toggleSection(section.id)}>
            <Icon id={section.id} open={openSection === section.id} />
            {section.name} | {section.sets} sets | {section.exercises.length} exercises
          </AccordionHeader>
          <AccordionBody>
            {section.exercises.map((exercise) => (
              <Accordion key={exercise.id} open={openExercise === exercise.id}>
                <AccordionHeader onClick={() => toggleExercise(exercise.id)}>
                  <div className="flex flex-row items-center w-full">
                    <CldVideoPlayer
                      width="50%" // Maintain 50% width for the video
                      height="auto" // Auto height for aspect ratio
                      src={exercise.video}
                    />
                    <div className="flex flex-col ml-2 flex-grow"> {/* flex-grow applied here */}
                      <span className="text-lg flex-grow">{exercise.name}</span> {/* Optional: flex-grow if needed */}
                      <span className="text-sm text-gray-600 flex-grow">{exercise.work}</span>
                    </div>
                  </div>
                </AccordionHeader>
              </Accordion>
            ))}
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default WorkoutAccordion;
