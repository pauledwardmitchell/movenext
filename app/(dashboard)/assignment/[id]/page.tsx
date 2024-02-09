import { prisma } from "@/utils/db"

import ExerciseCard from "@/components/ExerciseCard"
import WorkoutAccordion from "@/components/WorkoutAccordion"

const getAssignment = async (id) => {
	const assignment = await prisma.assignment.findUnique({
	    where: {
	      id: id,
	    },
	    include: {
	    	template: {
	    		include: {
	    			exercises: true
	    		}
	    	}
	    }
	})
	return assignment
}

const exercisesWithIndexForAccordion = ( {exercises} ) => {
	for (let i = 0; i < exercises.length; i++) {
		exercises[i]["accordionIndex"] = i+1 
	}
	return	exercises
}


const SingleWorkoutPage = async ( {params} ) => {
	const assignment = await getAssignment(params.id)
	const exercises = assignment.template.exercises
	return (
		<div>
			<div>{assignment.name}</div>
			<WorkoutAccordion exercises={exercisesWithIndexForAccordion({exercises})} />
		</div>

	)
}

export default SingleWorkoutPage