import { getUserFromClerkID } from '@/utils/auth'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Image from 'next/image' 
import { getCldImageUrl } from 'next-cloudinary' 
import MenuLinks from "@/components/MenuLinks"

const DashboardLayout = async ({ children }) => {
  const user = await getUserFromClerkID()
  if (user.role !== 'ADMIN') {
    redirect('/myworkouts')
    return null
  }

  // Fetch the logo URL
  const logoUrl = getCldImageUrl({
    width: 40, 
    height: 40,
    src: 'augustyn_fitness_logo_hurdler_png'
  });

  return (
    <main className="grid w-screen h-screen grid-cols-1 sm:grid-cols-[1fr_6fr] sm:grid-rows-[60px_6fr_1fr]">
      <header className="h-[60px] bg-gray-100 border-b border-black/10 sm:col-span-2">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center text-xl font-bold ml-4">
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

      <nav className="bg-gray-100 border-r border-black/10">
        <MenuLinks />
      </nav>
      
      <div className="bg-gray-100">{children}</div>

      {/* Footer can be uncommented and used if needed
      <footer className="bg-white sm:col-span-2">
        hambisa.augustynfitness.com
      </footer> */}
    </main>
  )
}

export default DashboardLayout
