"use client"

import { useState } from 'react';
import Link from 'next/link';
import WorkoutModal from '@/components/WorkoutModal';

export default function ClientWorkouts({ assignments }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const handleOpenModal = (assignment) => {
        setSelectedAssignment(assignment);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedAssignment(null);
    };

    return (
		<div className="p-10 bg-gray-100 flex flex-col overflow-y-auto h-full">
		  <h1 className="text-3xl mb-8">My Workouts</h1>
		  <ul className="mt-4 grid grid-cols-1 gap-4 overflow-y-auto">
		    {assignments.map((assignment) => (
		      <li key={assignment.id} className="mb-3">
		        <a href="#" onClick={() => handleOpenModal(assignment)}>
		          <span className="hover:underline">{assignment.name}</span>
		        </a>
		      </li>
		    ))}	
            </ul>
            {isOpen && (
                <WorkoutModal assignment={selectedAssignment} onClose={handleCloseModal} />
            )}
        </div>
    );
}
