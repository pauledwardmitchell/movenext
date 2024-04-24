import { getUserFromClerkID } from '@/utils/auth'
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

  const user = await getUserFromClerkID()
  if (user.role !== 'ADMIN') {
    redirect('/myworkouts')
    return null
  }
	
	return (
		<div className="w-full h-full">
			<EditableExerciseCard exercise={exercise} />
			<ExerciseCard exercise={exercise} />
		</div>
)}

export default ExercisePage
