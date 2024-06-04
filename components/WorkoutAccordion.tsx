"use client"

import { useState, useEffect } from 'react';
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

const formatRestTime = (rest) => {
  if (/^\d+$/.test(rest)) { // Check if the rest value consists solely of digits
    const restNumber = parseInt(rest, 10);
    if (restNumber > 60) {
      const minutes = Math.floor(restNumber / 60);
      const seconds = restNumber % 60;
      return seconds === 0 ? `${minutes} minutes` : `${minutes} min ${seconds} sec`;
    } else {
      return `${restNumber} seconds`;
    }
  }
  return rest; // If it's not a number, return the text as is
};

const WorkoutAccordion = ({ sections }) => {
  const [openSection, setOpenSection] = useState(null);
  const [openExercise, setOpenExercise] = useState(null);
  const [oneRmValues, setOneRmValues] = useState({});
  const [showOneRmForm, setShowOneRmForm] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [oneRm, setOneRm] = useState('');
  const [percentWork, setPercentWork] = useState('');
  const [unit, setUnit] = useState('kg');
  const [calculatedWeight, setCalculatedWeight] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
    setOpenExercise(null);  // Reset exercise accordion when changing sections
  };

  const toggleExercise = (exerciseId) => {
    setOpenExercise(openExercise === exerciseId ? null : exerciseId);
  };

  const handleCalculateOneRm = (exercise) => {
    setCurrentExercise(exercise);
    setShowOneRmForm(true);
  };

  const handleRecalculateOneRm = (exerciseId) => {
    setCurrentExercise(exerciseId);
    setShowOneRmForm(true);
  };

  const handleOneRmSubmit = (e) => {
    e.preventDefault();
    const weight = (oneRm * (percentWork / 100)).toFixed(2);
    setCalculatedWeight(weight);
    setOneRmValues(prevState => ({
      ...prevState,
      [currentExercise.id]: { weight, unit }
    }));
    setShowOneRmForm(false);
  };

  const handleCloseOneRmForm = () => {
    setShowOneRmForm(false);
    setCurrentExercise(null);
  };

  return (
    <div>
      {sections.map((section) => (
        <Accordion key={section.id} open={openSection === section.id}>
          <AccordionHeader onClick={() => toggleSection(section.id)}>
            <Icon id={section.id} open={openSection === section.id} />
            <div className="flex flex-col ml-3 items-center"> {/* Modified here to stack span tags vertically */}
              <span>{section.name}</span>
              <span className="text-sm text-gray-600">{section.sets} sets | {section.exercises.length} exercises | {formatRestTime(section.restAfterSuperset)} rest after SuperSet</span>
            </div>
          </AccordionHeader>
          <AccordionBody>
            {section.exercises.map((exercise) => (
              <Accordion key={exercise.id} open={openExercise === exercise.id}>
                <AccordionHeader onClick={() => toggleExercise(exercise.id)}>
                  <div className="flex flex-row items-center w-full">
                    <div className="w-3/5">
                      <CldVideoPlayer
                        width="50%"
                        height="auto" 
                        src={exercise.video}
                      />
                    </div>
                    <div className="flex flex-col ml-2 flex-grow w-2/5"> {/* flex-grow applied here */}
                      <span className="text-lg flex-grow">{exercise.name}</span> {/* Optional: flex-grow if needed */}
                      <span className="text-sm text-gray-600 flex-grow">{exercise.work}</span>
                      <span className="text-sm text-gray-600 flex-grow">
                        rest: {formatRestTime(section.restBetweenExercises)}
                      </span>
                      {isMounted && exercise.oneRmCalculator && (
                        <>
                          <div
                            onClick={() => handleCalculateOneRm(exercise)}
                            className="mt-2 text-sm text-black border border-black px-2 py-1 rounded cursor-pointer"
                          >
                            {oneRmValues[exercise.id] ? "Recalculate one rep max" : "Calculate one rep max"}
                          </div>
                          {oneRmValues[exercise.id] && (
                            <div className="text-sm text-gray-600 mt-2">
                              Your weight today: {oneRmValues[exercise.id].weight} {oneRmValues[exercise.id].unit}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </AccordionHeader>
              </Accordion>
            ))}
          </AccordionBody>
        </Accordion>
      ))}
      {showOneRmForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg">Calculate One Rep Max</h2>
            <form onSubmit={handleOneRmSubmit}>
              <label htmlFor="oneRm" className="block mt-2">1RM:</label>
              <input
                type="number"
                id="oneRm"
                value={oneRm}
                onChange={(e) => setOneRm(e.target.value)}
                className="border p-1 w-full"
              />
              <label htmlFor="percentWork" className="block mt-2">% Work:</label>
              <input
                type="number"
                id="percentWork"
                value={percentWork}
                onChange={(e) => setPercentWork(e.target.value)}
                className="border p-1 w-full"
              />
              <label htmlFor="unit" className="block mt-2">Unit:</label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border p-1 w-full"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
              <div className="mt-2 text-sm text-gray-600">
                Your weight today: {oneRm && percentWork ? (oneRm * (percentWork / 100)).toFixed(2) : ''} {unit}
              </div>
              <div className="mt-2">
                <button type="submit" className="mr-2 bg-blue-500 text-white p-1 rounded">Accept</button>
                <button type="button" onClick={handleCloseOneRmForm} className="bg-gray-300 p-1 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutAccordion;
