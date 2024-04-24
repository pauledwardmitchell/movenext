import { prisma } from "@/utils/db"

import UserSelect from "@/components/UserSelect"
import WorkoutAccordion from "@/components/WorkoutAccordion"


const getTemplate = async (id) => {
	const template = await prisma.template.findUnique({
		where: {
			id,
		},
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
		  name: users[i].firstName + " " + users[i].lastName,
		  index: i,
		  id: users[i].id,
		}
		userSelectOptions.push(obj)
	}

	return userSelectOptions
}

const TemplatePage = async ( {params} ) => {
	const template = await getTemplate(params.id)
	const sections = template.sections
	const userSelectOptions = await getUserSelectOptions()
	return (<div>
		    	<h2>{template.name}</h2>
		    	<WorkoutAccordion sections={sections} />
    		    <div>
    		      <div className="w-72">
    		        <UserSelect users={userSelectOptions} params={params} templateName={template.name} />
                  </div>
    		    </div>
		   </div>)
}

export default TemplatePage
