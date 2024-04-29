'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@material-tailwind/react';
import { deleteExercise } from '/utils/api';  // Import the deleteExercise function

const ExerciseList = ({ exercises: initialExercises }) => {
  const [exercises, setExercises] = useState(initialExercises);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteExercise(deleteCandidate.id);

      // After a successful delete, update local state to remove the exercise
      setExercises(currentExercises => currentExercises.filter(e => e.id !== deleteCandidate.id));
      console.log("Delete response:", result);
      // Display success message
      setSuccessMessage(`Successfully deleted the exercise: "${deleteCandidate.name}"`);
      setTimeout(() => setSuccessMessage(''), 3000); // Message disappears after 3 seconds
    } catch (error) {
      console.error('Error deleting exercise:', error);
      alert(error.message);
    }
    setDeleteCandidate(null);
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
      {successMessage && (
        <div className="text-sm text-green-600 border border-green-800 p-2 mt-4">
          {successMessage}
        </div>
      )}
      <ul className="mt-4 grid grid-cols-2 gap-4">
        {filteredExercises.map((exercise) => (
          <li key={exercise.id} className="flex justify-between items-center border border-black rounded p-2">
            <Link href={`/exercise/${exercise.id}`}>
              <span className="hover:underline">{exercise.name}</span>
            </Link>
            <button
              onClick={() => setDeleteCandidate(exercise)}
              className="text-red-500 hover:text-red-700 ml-4">
              &#10005;  {/* X symbol for delete */}
            </button>
          </li>
        ))}
      </ul>
      {deleteCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the exercise named "{deleteCandidate.name}"?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setDeleteCandidate(null)} className="bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
