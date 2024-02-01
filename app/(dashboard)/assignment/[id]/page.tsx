import { prisma } from "@/utils/db"

import ExerciseCard from "@/components/ExerciseCard"

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
	console.log("assignment ", assignment)
	return assignment
}


const SingleWorkoutPage = async ( {params} ) => {
	const assignment = await getAssignment(params.id)
	return (
		<div>
			<div>go smash it!</div>
			<ul>
				{assignment.template.exercises.map(exercise => (
					<ExerciseCard key={exercise.id} exercise={exercise} />
	    			))}
			</ul>
		</div>

	)
}

export default SingleWorkoutPage