import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import { getUserFromClerkID } from '@/utils/auth'

const user = await getUserFromClerkID()

const adminLinks = [
  { name: 'Build Template', href: '/buildtemplate' },
  { name: 'Create Exercise', href: '/newexercise' },
  { name: 'All Exercises', href: '/allexercises' },
  { name: 'All Templates', href: '/alltemplates' },
  { name: 'My Patients', href: '/mypatients' },
  { name: 'My Workouts', href: '/myworkouts' }
]

const userLinks = [
  {name: 'My Workouts', href: '/myworkouts' }
]

// const links = (user) => {
//   console.log('user role ', user.role)
// }

const DashboardLayout = ({ children }) => {
  
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">MOVE</span>
        </div>
        <div>
          <ul className="px-4">
            {adminLinks.map((link) => (
              <li key={link.name} className="text-xl my-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <nav className="px-4 h-full">
            <div className="flex items-center justify-end h-full">
              <UserButton afterSignOutUrl="/" />
            </div>
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout