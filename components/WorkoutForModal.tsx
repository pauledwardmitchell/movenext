"use client"

// import { prisma } from "@/utils/db"

import WorkoutAccordion from "@/components/WorkoutAccordion"

// const getAssignment = async (id) => {
// 	const assignment = await prisma.assignment.findUnique({
// 	    where: {
// 	      id: id,
// 	    },
// 	    include: {
// 	    	template: {
// 	    		include: {
// 	    			exercises: true
// 	    		}
// 	    	}
// 	    }
// 	})
// 	return assignment
// }

// const exercisesWithIndexForAccordion = ( {exercises} ) => {
// 	for (let i = 0; i < exercises.length; i++) {
// 		exercises[i]["accordionIndex"] = i+1 
// 	}
// 	return	exercises
// }


const WorkoutForModal = ( {assignment} ) => {
	console.log("assignment inside workoutForModal: ", assignment)
	const exercises = assignment.template.exercises
	return (
		<div>
			<WorkoutAccordion exercises={exercisesWithIndexForAccordion({exercises})} />
		</div>

	)
}

export default WorkoutForModal