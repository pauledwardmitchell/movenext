import { prisma } from "@/utils/db"
import ExerciseCard from "@/components/ExerciseCard"
import EditableExerciseCard from "@/components/EditableExerciseCard"

const getExercise = async (id) => {
	const exercise = await prisma.exercise.findUnique({
		where: {
			id,
		}
	})	
	return exercise
}

const ExercisePage = async ( {params} ) => {
	const exercise = await getExercise(params.id)
	return (
		<div className="w-full h-full">
			<EditableExerciseCard exercise={exercise} />
			<ExerciseCard exercise={exercise} />
		</div>
)}

export default ExercisePage
