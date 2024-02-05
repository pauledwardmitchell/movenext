import { prisma } from "@/utils/db"
import TemplateForm from "@/components/TemplateForm"


const getExercises = async () => {
	const exercises = await prisma.exercise.findMany()
	return exercises
}


const BuildTemplatePage = async () => {
	const exercises = await getExercises()

	return (
		<div className="">
			<TemplateForm exercises={exercises} />
		</div>
	)
}

export default BuildTemplatePage
