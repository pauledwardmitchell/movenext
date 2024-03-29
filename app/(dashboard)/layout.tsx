import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
// import Link from 'next/link'

import MenuLinks from "@/components/MenuLinks"

const DashboardLayout = async ({ children }) => {

  const user = await getUserFromClerkID()

  if (user.role !== 'ADMIN') {
    redirect('/myworkouts')
    return null
  }

  return (
    <main className="grid w-screen h-screen grid-cols-1 sm:grid-cols-[1fr_6fr] sm:grid-rows-[60px_6fr_1fr]">
        
        <header className="h-[60px] bg-gray-100 border-b border-black/10 sm:col-span-2">
          <div className="flex items-center justify-end h-full px-4">
            <UserButton className="" afterSignOutUrl="/" />
          </div>
        </header>

      <nav className="bg-green-100 border-r border-black/10">
        <MenuLinks />
      </nav>
      
      <div className="bg-blue-100">{children}</div>

      <footer className="bg-yellow-100 sm:col-span-2">
        FOOTER
      </footer>
    </main>
  )
}

export default DashboardLayout