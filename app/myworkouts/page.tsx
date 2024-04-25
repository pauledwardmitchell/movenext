import Image from 'next/image'
import { getCldImageUrl } from 'next-cloudinary'
import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'
import MenuLinks from "@/components/MenuLinks"
import ClientWorkouts from "@/components/ClientWorkouts"

const getAssignments = async (id) => {
  const assignments = await prisma.assignment.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      template: {},
    }
  })

  return assignments
}

const MyWorkoutsPage = async () => {
  const user = await getUserFromClerkID();
  const assignments = await getAssignments(user.id);
  const logoUrl = getCldImageUrl({
    width: 40, // smaller width for header logo
    height: 40,
    src: 'augustyn_fitness_logo_hurdler_png'
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="h-16 bg-gray-100 border-b border-black/10">
        <div className="flex items-center justify-between h-15 px-4 py-4">
          <div className="flex items-center text-xl font-bold">
            <Image
              src={logoUrl}
              width={40}
              height={40}
              alt="Logo"
            />
            <span className="ml-2">HAMBISA</span>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      {user.role === 'ADMIN' && (
        <nav className="bg-gray-100 border-r border-black/10 p-4">
          <MenuLinks />
        </nav>
      )}
      <div className="flex flex-1 overflow-hidden">
        {user.admin && (
          <aside className="w-60 min-w-min bg-gray-100 border-r border-black/10">
            <MenuLinks />
          </aside>
        )}
        <ClientWorkouts assignments={assignments} className="flex-1 overflow-y-auto w-full" />
      </div>
    </div>
  )
}

export default MyWorkoutsPage
