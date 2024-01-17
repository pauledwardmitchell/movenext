import { prisma } from "@/utils/db"
import { getUserFromClerkID } from '@/utils/auth'

const getWorkouts = async () => {
	const user = await getUserFromClerkID()
	const workouts = await prisma.assignment.findMany({
	    where: {
	      userId: user.id,
	    },
	    orderBy: {
	      createdAt: 'desc',
	    }
	})

	return workouts
}


const MyWorkoutsPage = async () => {
	const workouts = await getWorkouts()
	console.log('workouts', workouts)
	return <div>my workouts here</div>
}

export default MyWorkoutsPage