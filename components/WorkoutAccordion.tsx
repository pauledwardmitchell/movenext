"use client"

import { useState } from 'react'

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react"

import ExerciseCard from "@/components/ExerciseCard"
 
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
 
const WorkoutAccordion = ( {exercises}) => {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <div>
      {exercises.map(exercise => (
      	<div key={exercise.id}>
      	<Accordion open={open === exercise.accordionIndex} icon={<Icon id={exercise.accordionIndex} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(exercise.accordionIndex)}>{exercise.name} | {exercise.description}</AccordionHeader>
          <AccordionBody>
            <ExerciseCard key={exercise.id} exercise={exercise} />
          </AccordionBody>
        </Accordion>	
        </div>
	   ))}
    </div>
  );
}

export default WorkoutAccordion