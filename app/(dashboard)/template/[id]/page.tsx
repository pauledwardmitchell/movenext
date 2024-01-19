import { prisma } from "@/utils/db"

import UserSelect from "@/components/UserSelect"


const getTemplate = async (id) => {
	const template = await prisma.template.findUnique({
		where: {
			id,
		},
		include: {
			exercises:{}
		}
	})	
	return template
}

//eventually this will have to be programmed to get patients for a given provider
const getUserSelectOptions = async () => {
	const users = await prisma.user.findMany()

	var i
	let userSelectOptions = []
	for (i = 0; i < users.length; i++) {
		let obj = {
		  value: users[i].email,
		  index: i,
		  id: users[i].id,
		}
		userSelectOptions.push(obj)
	}

	return userSelectOptions
}

//pass in data like the select needs with value and id

const TemplatePage = async ( {params} ) => {
	const template = await getTemplate(params.id)
	const userSelectOptions = await getUserSelectOptions()
	return (<div>
		    	<h2>{template.name}</h2>
		        <ul>
    		      {template.exercises.map(exercise => (
    			    <li key={exercise.id}>{exercise.name}</li>))}
    		    </ul>
    		    <div>
    		      <div className="w-72">
    		        <UserSelect users={userSelectOptions} params={params} />
                  </div>
    		    </div>
		   </div>)
}

export default TemplatePage
