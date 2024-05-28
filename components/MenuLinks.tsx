import Link from 'next/link'

import { getUserFromClerkID } from '@/utils/auth'

const adminLinks = [
  { name: 'Build Template', href: '/buildtemplate' },
  { name: 'Create Exercise', href: '/newexercise' },
  { name: 'All Exercises', href: '/allexercises' },
  { name: 'All Templates', href: '/alltemplates' },
  { name: 'My Patients', href: '/mypatients' },
  { name: 'Upload Exercises', href: '/uploadexercises' },
  { name: 'My Workouts', href: '/myworkouts' }
]

const userLinks = [
  {name: 'My Workouts', href: '/myworkouts' }
]

const links = (userRole) => {
  if (userRole == 'ADMIN' ) {
    return adminLinks
  } else if (userRole == 'USER') {
    return userLinks
  } else {
    return {}
  }
}

const MenuLinks = async () => {
	const user = await getUserFromClerkID()

	return (
        <div>
          <ul className="px-4">
            {links(user.role).map((link) => (
              <li key={link.name} className="text-l my-3 mx-4">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
)}

export default MenuLinks