import { prisma } from "@/utils/db"
import ExerciseCard from "@/components/ExerciseCard"
import NewTemplateForm from "@/components/NewTemplateForm"

const getExercises = async () => {
	const exercises = await prisma.exercise.findMany()
	console.log('all exercises', exercises)
	return exercises
}


const BuildTemplatePage = async () => {
	const exercises = await getExercises()

	return (
	<div>
		<div className="p-10 bg-zinc-400/10">
			<h2 className="text-3xl mb-8">build templates here</h2>
			<div className="grid grid-cols-3 gap-4">
			{exercises.map((exercise) => (
				<ExerciseCard key={exercise.id} exercise={exercise}/>
			))}
			</div> 
		</div>
	  <aside className="absolute right-0 top-[60px] h-full w-[400px] border-l border-black/10">
        <div className="px-4 my-4">
        </div>
        <div>
          <ul className="px-4">
			New Template Form
          </ul>
          <NewTemplateForm />
        </div>
      </aside>
	</div>
	)
}

export default BuildTemplatePage
