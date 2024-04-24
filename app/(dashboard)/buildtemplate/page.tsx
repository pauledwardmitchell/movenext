import { prisma } from "@/utils/db"
import TemplateForm from "@/components/TemplateForm"
import { getUserFromClerkID } from '@/utils/auth'


const getExercises = async (searchParams) => {
	const exercises = await prisma.exercise.findMany()
	return exercises
}

const getTemplate = async (id) => {

	if (!id) {
	    // Return null or an empty object if no id is provided
	    return null;
	}

	const template = await prisma.template.findUnique({
		where: {
			id,
		},
	})	
	return template
}

const BuildTemplatePage = async ({searchParams}) => {
	const exercises = await getExercises(searchParams)
	const template = await getTemplate(searchParams.templateId)

	  const user = await getUserFromClerkID()
  if (user.role !== 'ADMIN') {
    redirect('/myworkouts')
    return null
  }

	return (
		<div className="">
			<TemplateForm 
				exercises={exercises} 
				initialTemplate={template}
				editTemplate={searchParams.formType==="edit"}
				templateId={searchParams.templateId}
			/>
		</div>
	)
}

export default BuildTemplatePage


