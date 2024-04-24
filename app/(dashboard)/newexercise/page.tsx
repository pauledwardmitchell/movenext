import { getUserFromClerkID } from '@/utils/auth'
import NewExerciseForm from "@/components/NewExerciseForm"

const NewExercisePage = async () => {

	  const user = await getUserFromClerkID()
  if (user.role !== 'ADMIN') {
    redirect('/myworkouts')
    return null
  }

	return (
	<div>
		<NewExerciseForm />
	</div>
	)
}

export default NewExercisePage