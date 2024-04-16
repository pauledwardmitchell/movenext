'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@material-tailwind/react';

const ExerciseList = ({ exercises }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        label="Search for an exercise"
        size="lg"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {filteredExercises.map((exercise) => (
          <li key={exercise.id}>
            <Link href={`/exercise/${exercise.id}`}>{exercise.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
