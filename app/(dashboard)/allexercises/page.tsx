import { prisma } from "@/utils/db"
import Link from "next/link"

const getExercises = async () => {
	const exercises = await prisma.exercise.findMany()
	return exercises
}

const BuildTemplatePage = async () => {
	const exercises = await getExercises()

	return (
	<div>
		<div className="p-10 bg-zinc-400/10">
			<h2 className="text-3xl mb-8">all exercises</h2>
			<div className="">
			<ul>
			{exercises.map((exercise) => (
				<li key={exercise.id}>
					<Link href={`/exercise/${exercise.id}`}>{exercise.name}</Link>
				</li>
			))}
			</ul>
			</div> 
		</div>
	</div>
	)
}

export default BuildTemplatePage