import { prisma } from "@/utils/db"
import PatientSearch from "@/components/PatientSearch"

//will have to fetch based on provider
const getUsers = async () => {
	const users = await prisma.user.findMany({
    orderBy: {
      lastName: 'asc',
    },
  })
	return users
}

const MyPatientsPage = async () => {
	const users = await getUsers()

	  return (
	    <div className="p-10 bg-zinc-400/10">
	      <h2 className="text-3xl mb-8">My Patients</h2>
	      <PatientSearch initialUsers={users} /> 
	    </div>
	  )
}

export default MyPatientsPage
