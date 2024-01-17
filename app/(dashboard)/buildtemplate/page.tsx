import { prisma } from "@/utils/db"
import NewTemplateForm from "@/components/NewTemplateForm"
import TemplateForm from "@/components/TemplateForm"


const getExercises = async () => {
	const exercises = await prisma.exercise.findMany()
	console.log('all exercises', exercises)
	return exercises
}


const BuildTemplatePage = async () => {
	const exercises = await getExercises()

	return (
		<div className="p-10 bg-zinc-400/10">
			<h2 className="text-3xl mb-8">build templates here</h2>
			<TemplateForm exercises={exercises} />
		</div>
	)
}

export default BuildTemplatePage
