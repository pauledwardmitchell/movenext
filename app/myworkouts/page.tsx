import { prisma } from "@/utils/db"
import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link';

import MenuLinks from "@/components/MenuLinks"
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

    <main className="grid w-screen h-screen grid-cols-1 sm:grid-cols-[1fr_6fr] sm:grid-rows-[60px_6fr_1fr]">
        
      <header className="h-[60px] bg-gray-100 border-b border-black/10 sm:col-span-2">
        <div className="flex items-center justify-between h-full px-4">
          <div className="text-xl font-bold ml-4">HAMBISA</div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <nav className="bg-gray-100 border-r border-black/10">
        <MenuLinks />
      </nav>
      
	    <div className="p-10 bg-gray-100">
	      <h1 className="text-3xl mb-8">Your Workouts</h1>
	      <ul className="mt-4 grid grid-cols-1 gap-4">
	        {assignments.map((assignment) => (
	          <li key={assignment.id} className="mb-3">
	            <Link href={`/assignment/${assignment.id}`}>
	              <span className="hover:underline">{assignment.name}</span>
	            </Link>
	          </li>
	        ))}
	      </ul>
	    </div>
    </main>
  )
}

export default MyWorkoutsPage