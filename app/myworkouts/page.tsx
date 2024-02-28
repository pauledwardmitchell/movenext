import { prisma } from "@/utils/db"
import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'

import MyWorkoutsContent from "@/components/MyWorkoutsContent"

const getAssignments = async () => {
	const user = await getUserFromClerkID()
	const assignments = await prisma.assignment.findMany({
	    where: {
	      userId: user.id,
	    },
	    orderBy: {
	      createdAt: 'desc',
	    },
	    include: {
	    	template: {
	    		include: {
	    			exercises: true
	    		}
	    	},
	    }
	})

	return assignments
}

const MyWorkoutsPage = async () => {

  const assignments = await getAssignments()

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
		<MyWorkoutsContent assignments={assignments} />
      </div>
    </div>
  )
}

export default MyWorkoutsPage