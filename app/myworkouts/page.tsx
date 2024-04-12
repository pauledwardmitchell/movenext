import { prisma } from "@/utils/db"
import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link';

import MyWorkoutsContent from "@/components/MyWorkoutsContent"

const getAssignments = async ( id ) => {
	const assignments = await prisma.assignment.findMany({
	    where: {
	      userId: id,
	    },
	    orderBy: {
	      createdAt: 'desc',
	    },
	    include: {
	    	template: {
	    	},
	    }
	})

	return assignments
}

const MyWorkoutsPage = async () => {
  const user = await getUserFromClerkID()
  const assignments = await getAssignments( user.id )

return (
    <div className="bg-blue-50 h-screen">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <nav className="flex justify-between items-center py-6">        
          <a href="/myworkouts" className="text-xl font-semibold text-blue-600">move<span className="font-light">augustynfitness</span></a>
          <div className="space-x-4">
	        {/*<div className="flex items-center justify-end h-full px-4">*/}
	          <UserButton className="flex" afterSignOutUrl="/" />
	        {/*</div>          */}
	      </div>
        </nav>

        {/* Main Content */}
		{/*<MyWorkoutsContent assignments={assignments} />*/}
		<div className="my-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Your Assignments</h1>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id} className="mb-3">
            {/* Assuming the template name is accessible via assignment.template.name */}
            <Link href={`/assignment/${assignment.id}`}>
              <span className="text-blue-600 hover:underline">{assignment.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
      </div>
    </div>
  )
}

export default MyWorkoutsPage