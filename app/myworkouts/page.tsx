import { prisma } from "@/utils/db"
import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link';

import MenuLinks from "@/components/MenuLinks"
import ClientWorkouts from "@/components/ClientWorkouts"

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
    const user = await getUserFromClerkID();
    const assignments = await getAssignments(user.id);

		return (
	    <div className="flex flex-col h-screen bg-gray-100">
	      <header className="h-16 bg-gray-100 border-b border-black/10">
	        <div className="flex items-center justify-between h-15 px-4 py-4">
	          <div className="text-xl font-bold">HAMBISA</div>
	          <UserButton afterSignOutUrl="/" />
	        </div>
	      </header>
	      {user.admin && (
	        <nav className="bg-gray-100 border-r border-black/10 p-4">
	          <MenuLinks />
	        </nav>
	      )}
	      <div className="flex flex-1 overflow-hidden">
	        {user.admin && (
	          <aside className="w-60 min-w-min bg-gray-100 border-r border-black/10"> {/* Fixed width sidebar */}
	            <MenuLinks />
	          </aside>
	        )}
	        <ClientWorkouts assignments={assignments} className="flex-1 overflow-y-auto w-full" />
	      </div>
	    </div>
	  )
}

export default MyWorkoutsPage