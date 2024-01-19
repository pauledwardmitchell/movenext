import { prisma } from "@/utils/db"

import UserSelect from "@/components/UserSelect"


const getUser = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			assignments:{}
		}
	})	
	return user
}

const UserPage = async ( {params} ) => {
	const user = await getUser(params.id)
	return (<div>
		    	<h2>{user.email}</h2>
		        <ul>
    		      {user.assignments.map(assignment => (
    			    <li key={assignment.id}>{assignment.name}</li>))}
    		    </ul>
		   </div>)
}

export default UserPage