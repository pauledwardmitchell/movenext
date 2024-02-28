"use client"
import { useState } from 'react'

import ResponsiveModal from "@/components/ResponsiveModal"


const MyWorkoutsContent = (assignments) => {
console.log("assignments inside myworkouts content ", assignments)
  const [isModalOpen, setModalOpen] = useState(false);
  const [assignment, setAssignment] = useState({})

  const openModal = (assignment) => {
  	setModalOpen(true);
  	setAssignment(assignment);
  }

  const closeModal = () => {
  	setModalOpen(false);
  }

return (
    <div className="">
        {/* Main Content */}
        <main className="mt-10">
          {/* Installation Guide */}
          <section className="mt-16">
            <h1 className="text-3xl font-bold text-gray-800">your workouts</h1>
            {assignments.assignments.map(assignment => (
	    		<p key={assignment.id} onClick={() => openModal(assignment)} className="mt-3 text-lg text-gray-600">
	    			{assignment.name}
	    		</p>
	    	))}
	    	
            <ResponsiveModal isOpen={isModalOpen} closeModal={closeModal} assignment={assignment} />
          </section>
        </main>
    </div>
  )
}

export default MyWorkoutsContent