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
			<h4>my workouts here</h4>
			<ul>
				{assignments.map(assignment => (
					
	    				<li key={assignment.id}>
	    					<Link href={`/assignment/${assignment.id}`} key={assignment.id}>{assignment.name}</Link>
	    				</li>
	    			))}
			</ul>
		</div>

	)
}

export default MyWorkoutsPage