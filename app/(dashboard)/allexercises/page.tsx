import { prisma } from "@/utils/db"
import ExerciseList from '@/components/ExerciseList'

const getExercises = async () => {
	const exercises = await prisma.exercise.findMany()
	return exercises
}

const AllExercisesPage = async () => {
	const exercises = await getExercises()

	return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">All Exercises</h2>
      <ExerciseList exercises={exercises} />
    </div>
  );
}

export default AllExercisesPage
