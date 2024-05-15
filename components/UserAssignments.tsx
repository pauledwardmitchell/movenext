"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

const UserAssignments = ({ initialAssignments }) => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Function to handle the deletion of an assignment
  const handleDelete = async (assignment) => {
    try {
      const response = await fetch(`/api/assignment/${assignment.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok) {
        // Remove the deleted assignment from the local state
        setAssignments((currentAssignments) =>
          currentAssignments.filter((a) => a.id !== assignment.id)
        );
        console.log("Delete response:", result);
      } else {
        // Handle potential errors returned by the API
        throw new Error(result.error || 'Failed to delete the assignment.');
      }
    } catch (error) {
      // Log or display the error message
      console.error('Error deleting assignment:', error);
      alert(error.message);
    }
    // Close modal regardless of the outcome
    setDeleteCandidate(null);
  };

  return (
    <div>
      {assignments.length > 0 ? (
        <div>
          <ul>
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                className="flex justify-between items-center border-b border-gray-300 p-3"
              >
                <Link href={`/assignment/${assignment.id}`}>
                  <div className="hover:bg-gray-300">
                    {assignment.template} {assignment.name}
                  </div>
                </Link>
                <button
                  onClick={() => setDeleteCandidate(assignment)}
                  className="text-red-500 hover:text-red-700 border border-gray-400 p-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <Link href="/alltemplates">
            <div className="mt-4 inline-block text-blue-500 hover:underline">
              Assign another Template to this Athlete
            </div>
          </Link>
        </div>
      ) : (
        <Link href="/alltemplates">
          <div className="text-blue-500 hover:underline">
            Assign a Template to this Athlete
          </div>
        </Link>
      )}

      <DeleteConfirmationModal
        show={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={() => handleDelete(deleteCandidate)}
        assignmentName={deleteCandidate?.name}
      />
    </div>
  );
};

export default UserAssignments;
