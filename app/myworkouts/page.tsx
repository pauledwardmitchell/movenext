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
            <ClientWorkouts assignments={assignments} />
        </main>
    )
}

export default MyWorkoutsPage