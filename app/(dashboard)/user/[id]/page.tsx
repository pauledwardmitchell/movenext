import { prisma } from "@/utils/db"

import Link from 'next/link'

const getUser = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			assignments: true,
		},
	})	
	return user
}

const userAssignments = ( user ) => {
	if (!user.assignments || user.assignments.length == 0){
		return <Link href="/alltemplates">Assign a Template to this Athlete</Link>
	} else {
		return <Link href="/alltemplates">Assign another Template to this Athlete</Link>
	}
}

const UserPage = async ( {params} ) => {
	const user = await getUser(params.id)
	return (
		<div className="w-full h-full">
			<div>{user.email}</div>
			<div>{user.assignments.length} assignments</div>
			{userAssignments(user)}
		</div>
)}

export default UserPage