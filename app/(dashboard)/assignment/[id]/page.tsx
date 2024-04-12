import { prisma } from "@/utils/db"

import CollapsibleSection from "@/components/CollapsibleSection"
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
	const sections = assignment.template.sections
	return (
		<div>
			<div>{assignment.name}</div>
	      {sections.map((section, index) => (
	        <div key={index} className="mb-2">
	          {JSON.stringify(section, null, 2)}
	        </div>
	      ))}
			<WorkoutAccordion sections={sections} />
		</div>

	)
}

export default SingleWorkoutPage

