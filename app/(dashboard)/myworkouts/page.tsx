import { prisma } from "@/utils/db"
import { getUserFromClerkID } from '@/utils/auth'

import Link from "next/link"

const getAssignments = async () => {
	const user = await getUserFromClerkID()
	const assignments = await prisma.assignment.findMany({
	    where: {
	      userId: user.id,
	    },
	    orderBy: {
	      createdAt: 'desc',
	    },
	    include: {
	    	template: true
	    }
	})

	return assignments
}


const MyWorkoutsPage = async () => {
	const assignments = await getAssignments()
	return (
		<div>
			<div>my workouts here</div>
			<ul>
				{assignments.map(assignment => (
					
	    				<li key={assignment.id}>
	    					<Link href={`/assignment/${assignment.id}`} key={assignment.id}>{assignment.template.name} {assignment.name}</Link>
	    				</li>
	    			))}
			</ul>
		</div>

	)
}

export default MyWorkoutsPage