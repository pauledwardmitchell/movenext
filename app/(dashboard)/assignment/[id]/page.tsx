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
	    	}
	    }
	})
	return assignment
}


const SingleWorkoutPage = async ( {params} ) => {
	const assignment = await getAssignment(params.id)
	const sections = assignment.template.sections
	return (
		<div className="p-10">
			<h2 className="text-3xl mb-8">{assignment.name}</h2>
			<WorkoutAccordion sections={sections} />
		</div>

	)
}

export default SingleWorkoutPage

