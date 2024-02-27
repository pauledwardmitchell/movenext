"use client"
import { useState } from 'react'

import ResponsiveModal from "@/components/ResponsiveModal"


const MyWorkoutsContent = (assignments) => {
console.log("assignments inside myworkouts content ", assignments)
  const [isModalOpen, setModalOpen] = useState(false);
  const [assignmentId, setAssignmentId] = useState('')

  const openModal = (id) => {
  	setModalOpen(true);
  	setAssignmentId(id);
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
	    		<p key={assignment.id} onClick={() => openModal(assignment.id)} className="mt-3 text-lg text-gray-600">
	    			{assignment.name}
	    		</p>
	    	))}

            {/* Installation Steps */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800">Installation</h2>
              <div className="mt-4">
                <p className="text-gray-600">The simplest and fastest way to get up and running with Tailwind CSS from scratch is with the Tailwind CLI tool. The CLI is also available as a standalone executable if you want to use it without installing Node.js.</p>
                <div className="mt-4 bg-gray-900 text-white p-4 rounded-md">
                  <p className="font-mono">1. Install Tailwind CSS</p>
                  <p className="font-mono">Install 'tailwindcss' via npm, and create your 'tailwind.config.js' file.</p>
                  <div className="mt-2 bg-gray-800 p-2 rounded">
                    <p className="font-mono">npm install -D tailwindcss</p>
                    <p className="font-mono">npx tailwindcss init</p>
                  </div>
                </div>
              </div>
            </div>
            <ResponsiveModal isOpen={isModalOpen} closeModal={closeModal} assignmentId={assignmentId} />
          </section>
        </main>
    </div>
  )
}

export default MyWorkoutsContent